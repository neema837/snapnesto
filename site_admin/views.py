from django.shortcuts import render,get_object_or_404,redirect
from photography.models import *
from django.http import HttpResponse
from django.contrib import messages
from django.urls import reverse
import face_recognition
import pickle
from MultiImg.models import Image
from django.contrib.auth import login, authenticate, logout
from .forms import LoginForm
from django.contrib.auth.decorators import login_required

# Create your views here.
def siteadmin_login(request):   
    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                messages.error(request, 'You are logged in successfully.')
                return redirect('dashboard')
        else:
            messages.error(request, 'Invalid username or password.')
    else:
        form = LoginForm()
    return render(request, 'admin_login.html', {'form': form})


def siteadmin_logout(request): 
    logout(request)
    return redirect('site_login')

@login_required
def dashboard(request):
    return render(request,'dashboard.html')

def view_detail(request):
    sliders=Slider.objects.all()
    specs=Specialities.objects.all()
    com_categs = Commercial_Category.objects.all()
    com_imgs = Commercials.objects.all()
  
    context ={
        "sliders": sliders,
        "specs" : specs ,
        "com_categs" : com_categs ,
        "com_imgs"   : com_imgs 
    }
    return render(request,"admin_tables.html",context)

def upload_forms(request):
    categ=Commercial_Category.objects.all()
    return render(request,"forms.html",{"categ":categ})

def upload_sliderimg(request):
    if request.method == 'POST':
        imgs = request.FILES.getlist('slider_img')

        if len(imgs)<=3:
            for image in imgs:
                Slider.objects.create(slider_image=image)
        else:
            messages.success(request, 'Please upload 3 slider or less')            
        messages.success(request, 'Slider item added successfully!')
        return redirect("view_detail")
    return HttpResponse('error: Invalid request method')

def slider_edit(request,sid):
    if request.method == 'POST':
        slider = get_object_or_404(Slider, id=sid)
        simg = request.FILES.get('simg')
        if simg:
            slider.slider_image = simg
            slider.save()
            messages.success(request, 'Slider item edited successfully!')
            return redirect('view_detail')
    return render(request,"slider_edit.html")

def slider_delete(request,sid):
    slider = get_object_or_404(Slider, id=sid)
    if request.method == 'POST':
        slider.delete()
        messages.success(request, 'Slider item deleted successfully!')
        return redirect('view_detail')
    return render(request,'slider_delete.html',{'slider':slider})

def upload_services(request):
        if request.method == 'POST':
            name = request.POST.get('service_name')
            des = request.POST.get('service_des')
            img = request.FILES.get('service_img')

            Specialities.objects.create(spec_image=img,spec_name=name,spec_description=des)
            messages.success(request, 'Other Servises item uploaded successfully!')
            return redirect('view_detail')
        return HttpResponse('Images uploaded successfully')

def service_edit(request,pk):
    spec = get_object_or_404(Specialities, id=pk)

    if request.method == 'POST':
        name = request.POST.get('service_name')
        des = request.POST.get('service_des')
        img = request.FILES.get('service_img')        
        if name or des:
            spec.spec_name=name
            spec.spec_description=des
            if img:
                spec.spec_image = img
            spec.save()
        messages.success(request, 'Slider item edited successfully!')
        return redirect('view_detail')
    return render(request,"services_edit.html",{'spec':spec})

def service_delete(request,pk):
    spec = get_object_or_404(Specialities, id=pk)
    if request.method == 'POST':
        spec.delete()
        messages.success(request, 'Specialities item deleted successfully!')
        return redirect('view_detail') 
    return render(request,'service_delete.html',{'spec':spec})

def upload_com_categ(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        image = request.FILES.get('img')
        
        category, created = Commercial_Category.objects.get_or_create(name=name)
        if image:
            category.commercial_categ_image = image
        category.save()
        messages.success(request, 'Category item added successfully!')
        return redirect("commertial_categ")

def upload_comimages(request):
    if request.method == 'POST':
        category_id = request.POST.get('category_id')
        imgs = request.FILES.getlist('images')
        if not category_id:
            return HttpResponse( 'Category ID is required')

        if not imgs:
            return HttpResponse('No images uploaded')

        try:
            category = Commercial_Category.objects.get(id=category_id)
        except Commercial_Category.DoesNotExist:
            return HttpResponse( 'Category does not exist')     

        for image in imgs:
            Commercials.objects.create(com_categ=category, images=image)
        messages.success(request, 'Commertial images added successfully!')
        url = reverse('commercial_images', kwargs={'slug': category.slug})
        return redirect(url)
    return HttpResponse('error: Invalid request method')

def commertial_categ(request):
    com_categs = Commercial_Category.objects.all()
    context ={
        "com_categs" : com_categs ,
    }
    return render(request,"commertial_categ.html",context)

def categ_edit(request,pk):
    categ = get_object_or_404(Commercial_Category, id=pk)

    if request.method == 'POST':
        name = request.POST.get('categ_name')
        img = request.FILES.get('categ_img')        
        if name:
            categ.name=name
            if img:
                categ.commercial_categ_image = img
            categ.save()
            messages.success(request, 'Category item updated successfully!')
        return redirect('admin_gallery')
    return render(request,"categ_edit.html",{'categ':categ})

def categ_delete(request,pk):
    categ = get_object_or_404(Commercial_Category, id=pk)
    if request.method == 'POST':
        categ.delete()
        messages.success(request, 'Category item deleted successfully!')
        return redirect('admin_gallery') 
    return render(request,'categ_delete.html',{'categ':categ})

def commercial_images(request, slug):
    category = get_object_or_404(Commercial_Category, slug=slug)
    images = category.com_images.all()
    return render(request, 'com_gallery.html', {'category': category, 'images': images})

def com_edit(request,pk):
    com_categs = Commercial_Category.objects.all()
    com = get_object_or_404(Commercials,id=pk)
    if request.method == 'POST':
        cimg = request.FILES.get('cimg')
        if cimg:
            com.images = cimg
            com.save()
            messages.success(request, 'Commercial item updated successfully!')
            url = reverse('commercial_images', kwargs={'slug': com.com_categ.slug})
            return redirect(url)

    return render(request,"com_edit.html",{'com_categs':com_categs,'com':com})

def com_delete(request,pk):
    com = get_object_or_404(Commercials, id=pk)
    if request.method == 'POST':
        com.delete()
        messages.success(request, 'Commercial item deleted successfully!')
        url = reverse('commercial_images', kwargs={'slug': com.com_categ.slug})
        return redirect(url)   
    return render(request,'com_delete.html',{'com':com})   

# face scan images upload

def upload_images(request):
    if request.method == 'POST':
        images = request.FILES.getlist('img')
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
            # print(f'Successfully saved & encoded image {image}')
        messages.success(request, 'Images uploaded successfully')

        return redirect('view_scan_images')   
    return render(request, 'faces_scan_upload.html')  

def face_scan_view(request):
    fs_img = Image.objects.all()
    return render(request,'face_scan_view.html',{'fs_img':fs_img})

def face_scan_del(request,pk):
    fs = get_object_or_404(Image, id=pk)
    if request.method == 'POST':
        fs.delete()
        messages.success(request, 'Fase Scan Image Deleted Successfully!')
        return redirect('view_scan_images') 
    return render(request,'face_scan_delete.html',{'fs':fs})