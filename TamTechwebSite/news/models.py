from django.db import models

# Create your models here.
from django.db import models
from cloudinary_storage.storage import MediaCloudinaryStorage

class News(models.Model):
    # Titres multilingues
    title_fr = models.CharField("Titre (FR)", max_length=255)
    title_en = models.CharField("Title (EN)", max_length=255, blank=True, null=True)
    title_ar = models.CharField("العنوان (AR)", max_length=255, blank=True, null=True)

    # Contenus multilingues
    content_fr = models.TextField("Contenu (FR)", blank=True, null=True)
    content_en = models.TextField("Content (EN)", blank=True, null=True)
    content_ar = models.TextField("المحتوى (AR)", blank=True, null=True)

    # Image (stockée sur Cloudinary via MediaCloudinaryStorage)
    image = models.ImageField(
        storage=MediaCloudinaryStorage(),
        upload_to="news/images/",
        verbose_name="Image",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "News"
        verbose_name_plural = "News"
        ordering = ("-created_at",)

    def __str__(self):
        return self.title_fr or self.title_en or "News"