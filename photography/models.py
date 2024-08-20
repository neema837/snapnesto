from django.db import models
from django.utils.text import slugify

# Create your models here.
class Slider(models.Model):
    slider_image = models.ImageField(upload_to="slider_images")

    def __str__(self):
        return f"{self.slider_image.name}"

class Commercial_Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True,null=True,blank=True)
    commercial_categ_image = models.ImageField(upload_to="commercial_category_images")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Commercial_Category, self).save(*args, **kwargs)


    def __str__(self):
        return self.name

class Commercials(models.Model):
    images = models.ImageField(upload_to="commercial_images")
    com_categ = models.ForeignKey(Commercial_Category, null=True, related_name='com_images' ,on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.com_categ}---------{self.images.name}"
    
class Specialities(models.Model):
    spec_image = models.ImageField(upload_to="commercial_images")
    spec_name = models.CharField(max_length=100)
    spec_description = models.TextField(null=True)

    def __str__(self):
        return f"{self.spec_name}---------{self.spec_image.name}"