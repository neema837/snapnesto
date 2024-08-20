from django.urls import path
from . import views
urlpatterns = [

    path('',views.main_index,name="main_index"),
    path('commercial<int:pk>',views.commercial,name="com_img"),

]