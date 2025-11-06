from django.db import models

# Create your models here.
from django.db import models
from cloudinary.models import CloudinaryField

class Valeur(models.Model):
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True, null=True)
    title_ar = models.CharField(max_length=255, blank=True, null=True)

    description_fr = models.TextField()
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)

    image = CloudinaryField (
        'Nos Valeurs',
        folder= 'valeur',
        blank = True,
        null = True
    )

    def __str__(self):
        return self.title_fr