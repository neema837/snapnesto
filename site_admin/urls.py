from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('dashboard',views.dashboard,name="dashboard"),
    path('site_login',views.siteadmin_login,name="site_login"),
    # path('admin_logout',views.siteadmin_logout,name="admin_logout"),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),



# upload details
    path('upload_forms',views.upload_forms,name="upload_forms"),

    path('up_comcateg',views.upload_com_categ,name="upload_com_categ"),
    path('upload_comimages',views.upload_comimages,name="upload_comimages"),
    path('upload_sliderimg',views.upload_sliderimg,name="upload_sliderimg"),
    path('upload_services',views.upload_services,name="upload_services"),


# face scan upload

    path('scan_upload',views.upload_images,name="scan_upload"),
    path('view_scan_images',views.face_scan_view,name="view_scan_images"),
    path('face_scan_del<int:pk>',views.face_scan_del,name="face_scan_del"),


# view details
    path('view_detail',views.view_detail,name="view_detail"),

    path('admin_gallery',views.commertial_categ,name="commertial_categ"),
    
    path('categ_edit<int:pk>',views.categ_edit,name="categ_edit"),
    path('categ_delete<int:pk>',views.categ_delete,name="categ_delete"),


    path('service_edit<int:pk>',views.service_edit,name="service_edit"),
    path('service_delete<int:pk>',views.service_delete,name="service_delete"),

    path('slider_edit<int:sid>',views.slider_edit,name="slider_edit"),
    path('slider_delete<int:sid>',views.slider_delete,name="slider_delete"),

    path('com_edit<int:pk>',views.com_edit,name="com_edit"),
    path('com_delete<int:pk>',views.com_delete,name="com_delete"),
    path('<slug:slug>',views.commercial_images,name="commercial_images"),










    
]

