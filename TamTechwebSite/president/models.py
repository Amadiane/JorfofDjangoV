from django.db import models

# Create your models here.
from django.db import models
from cloudinary.models import CloudinaryField

class MotPresident(models.Model):
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True, null=True)
    title_ar = models.CharField(max_length=255, blank=True, null=True)

    description_fr = models.TextField()
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)

    image = CloudinaryField(
        'Image du Président',
        folder='mot_president',
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Mot du Président"
        verbose_name_plural = "Mots du Président"
        ordering = ['-created_at']

    def __str__(self):
        return self.title_fr
