from django.db import models

# Create your models here.
from django.db import models

class Album(models.Model):
    title_fr = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200)
    description_fr = models.TextField()
    description_en = models.TextField()
    image = models.URLField(blank=True, null=True)  # lien Cloudinary

    def __str__(self):
        return self.title_fr


class Photo(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name="photos")
    title_fr = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200)
    comment_fr = models.TextField(blank=True, null=True)
    comment_en = models.TextField(blank=True, null=True)
    image = models.URLField(blank=True, null=True)  # lien Cloudinary

    def __str__(self):
        return self.title_fr