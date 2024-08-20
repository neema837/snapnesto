from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from . models import Slider,Commercial_Category,Commercials,Specialities
# Create your views here.
def main_index(request):
    # return HttpResponse('new app')
    comcateg_img = Commercial_Category.objects.all()
    spec = Specialities.objects.all()
    slider =Slider.objects.all()
    return render(request,'snap/index.html',{'comcateg_img':comcateg_img,'spec':spec,'slider':slider})

def commercial(request,pk):
    com_categ = get_object_or_404(Commercial_Category,pk=pk)
    com_img=Commercials.objects.filter(com_categ=pk)
    return render(request,'snap/gallery_masonry.html',{'com_img':com_img,'com_categ':com_categ}) 



