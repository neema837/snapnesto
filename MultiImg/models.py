from django.db import models
import numpy as np
import face_recognition
# Create your models here.

class Person(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    # Additional fields as needed

    def __str__(self):
        return self.name

class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    encoding = models.BinaryField(null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.image.name}"
    

class FaceImage(models.Model):
    image = models.ImageField(upload_to='faces/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    encoding = models.BinaryField(null=True, blank=True)

