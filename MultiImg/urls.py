from django.urls import path
from . import views

urlpatterns = [

    path('face_scan', views.face_scan, name='face_scan'),
    path('upload_images',views.upload_images,name='upload_image'),
    path('capture_selfie',views.capture_selfie,name='capture_selfie'),
    path('encode_upload_images',views.encode_upload_images,name='encode_upload_images'),
    # path('download/<int:image_id>/', views.download_image, name='download_image'),
    path('download_matched_image/<path:matched_image_url>/', views.download_matched_image, name='download_matched_image'),
    path('download_all_matched_images/', views.download_all_matched_images, name='download_all_matched_images'),



]