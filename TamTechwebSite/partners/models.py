from django.db import models

# Create your models here.
from django.db import models
from django.utils import timezone
from cloudinary.models import CloudinaryField

class Partner(models.Model): 
    name_fr = models.CharField(max_length=255, verbose_name="Nom (FR)")
    name_en = models.CharField(max_length=255, verbose_name="Name (EN)")
    
    cover_image = CloudinaryField(
        'Cover Image',
        folder='partners',
        blank=True,
        null=True
    )
    
    website_url = models.URLField(
        help_text="Partner's official website link",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Partner"
        verbose_name_plural = "Partners"
        ordering = ['-created_at']

    def __str__(self):
        return self.name_en or self.name_fr