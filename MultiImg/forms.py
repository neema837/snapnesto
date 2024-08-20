from django import forms
from .models import FaceImage,Image

class ImageForm(forms.ModelForm):
    class Meta:
        model = FaceImage
        fields = ['image']

class ImgForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['image']