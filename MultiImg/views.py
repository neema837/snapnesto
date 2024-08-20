from django.shortcuts import render
from .models import Image
from django.http import HttpResponse,Http404
import numpy as np
from .models import FaceImage
import face_recognition
import cv2,pickle,os,io,zipfile
from django.core.files import File
# for image download
from django.conf import settings
from urllib.parse import urlparse
from urllib.request import urlopen


def face_scan(request):
    return render(request,'scan/face_scan.html')


def upload_images(request):
    if request.method == 'POST':
        images = request.FILES.getlist('images')
        for image in images:
            img = Image.objects.create(image=image)
            load_img = face_recognition.load_image_file(img.image.path)
            encodings = face_recognition.face_encodings(load_img)
            # print("Uploaded image encoding starts here")
            if encodings:
                encoding = encodings[0]
                serialized_encoding = pickle.dumps(encoding)
                img.encoding = serialized_encoding
                img.save()
            print(f'Successfully saved & encoded image {image}')

        return HttpResponse('Images uploaded successfully')
    return render(request, 'upload.html')  


def encode_upload_images(request):
    images = Image.objects.filter(encoding__isnull=False)
    for image in images:
            img = face_recognition.load_image_file(image.image.path)
            encodings = face_recognition.face_encodings(img)
            print("Uploaded image encoding starts here")

            if encodings:
                encoding = encodings[0]
                serialized_encoding = pickle.dumps(encoding)
                image.encoding = serialized_encoding
                image.save()

            print(f'Successfully saved image {image.id}')
    return HttpResponse("Successfully saved encoded image")

def download_matched_image(request, matched_image_url):
    # Construct the full URL if necessary
    if not matched_image_url.startswith('http://') and not matched_image_url.startswith('https://'):
        matched_image_url = request.build_absolute_uri(matched_image_url)

    # Handle local media files
    if matched_image_url.startswith(request.build_absolute_uri(settings.MEDIA_URL)):
        local_path = os.path.join(settings.MEDIA_ROOT, os.path.relpath(urlparse(matched_image_url).path, settings.MEDIA_URL))
        if not os.path.exists(local_path):
            raise Http404("File does not exist")
        with open(local_path, 'rb') as file:
            response = HttpResponse(file.read(), content_type='image/png')
            response['Content-Disposition'] = f'attachment; filename="{os.path.basename(local_path)}"'
            return response
    else:
        # Handle remote files
        response = urlopen(matched_image_url)
        image_data = response.read()
        response = HttpResponse(image_data, content_type='image/png')
        response['Content-Disposition'] = f'attachment; filename="{os.path.basename(urlparse(matched_image_url).path)}"'
        return response

    return HttpResponse(status=405)


def recognize_matches(uploaded_image_path, person=None, batch_size=128):
    print("Find matches function starts")
    known_encodings = []
    known_urls = []

    # If a specific person is provided, filter images by that person
    face_images = Image.objects.all()

    # Collect known face encodings and URLs
    for face_image in face_images:
        if face_image.image.path != uploaded_image_path and face_image.encoding:
            known_urls.append(face_image.image.url)
            encoding = pickle.loads(face_image.encoding)
            known_encodings.append(encoding)
            print(f'Collected known face encoding and url {face_image.id}')

    if not known_encodings:
        return []

    # Load and encode the Selfie image
    print("Selfie image encoding starts here")

    uploaded_image = face_recognition.load_image_file(uploaded_image_path)
    uploaded_encodings = face_recognition.face_encodings(uploaded_image)
    if not uploaded_encodings:
        return []

    uploaded_encoding = uploaded_encodings[0]
    matches = []
    print("Selfie image encoding stops here")

    # Convert known encodings to numpy array for batch processing
    known_encodings = np.array(known_encodings)
    # Batch processing
    for i in range(0, len(known_encodings), batch_size):
        batch_encodings = known_encodings[i:i + batch_size]
        results = face_recognition.compare_faces(batch_encodings, uploaded_encoding)
        for j, match in enumerate(results):
            if match:
                matches.append(known_urls[i + j])
                # print(matches[0:])
                # print(len(matches))
                # download_image(len(matches))

    return matches 





def download_all_matched_images(request):
    if request.method == 'POST':
        matched_image_urls = request.POST.get('matched_image_urls')
        if not matched_image_urls:
            return HttpResponse("No images to download", status=400)
        
        matched_image_urls = matched_image_urls.split(',')

        # Create a zip file in memory
        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, 'w') as zip_file:
            for matched_image_url in matched_image_urls:
                # Construct the full URL if necessary
                if not matched_image_url.startswith('http://') and not matched_image_url.startswith('https://'):
                    matched_image_url = request.build_absolute_uri(matched_image_url)

                # Handle local media files
                if matched_image_url.startswith(request.build_absolute_uri(settings.MEDIA_URL)):
                    local_path = os.path.join(settings.MEDIA_ROOT, os.path.relpath(urlparse(matched_image_url).path, settings.MEDIA_URL))
                    if not os.path.exists(local_path):
                        continue
                    with open(local_path, 'rb') as file:
                        image_name = os.path.basename(local_path)
                        zip_file.writestr(image_name, file.read())
                else:
                    # Handle remote files
                    response = urlopen(matched_image_url)
                    image_name = os.path.basename(urlparse(matched_image_url).path)
                    zip_file.writestr(image_name, response.read())
        
        # Set the cursor of the BytesIO object to the beginning
        zip_buffer.seek(0)
        
        # Create the response
        response = HttpResponse(zip_buffer, content_type='application/zip')
        response['Content-Disposition'] = f'attachment; filename="matched_images.zip"'
        return response

    return HttpResponse(status=405)



# from django.shortcuts import get_object_or_404
# def download_image(request, image_id):
#     # img = get_object_or_404(Image, id=image_id)
#     response = HttpResponse(image_id, content_type='image/jpeg')
#     response['Content-Disposition'] = f'attachment'
#     return response 


def capture_selfie(request):
    # Capture image using OpenCV
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        cv2.imshow('Press Space to take a selfie', frame)

        # Press 'space' to take a picture
        if cv2.waitKey(1) & 0xFF == ord(' '):
            img_name = "selfie.jpg"
            cv2.imwrite(img_name, frame)
            break

    cap.release()
    cv2.destroyAllWindows()

    # Save the image to the Django model
    selfie = FaceImage()
    with open(img_name, 'rb') as f:
        selfie.image.save(img_name, File(f), save=True)
        matches = recognize_matches(selfie.image.path)
        return render(request, 'scan/recognized_images.html', {'matches': matches})





