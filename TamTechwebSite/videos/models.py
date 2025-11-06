from django.db import models

# Create your models here.
from django.db import models
from cloudinary_storage.storage import MediaCloudinaryStorage

class Video(models.Model):
    # Titres multilingues
    title_fr = models.CharField(max_length=255, verbose_name="Titre (Français)")
    title_en = models.CharField(max_length=255, verbose_name="Title (English)", blank=True, null=True)
    title_ar = models.CharField(max_length=255, verbose_name="العنوان (Arabe)", blank=True, null=True)

    # Commentaires multilingues
    comment_fr = models.TextField(verbose_name="Commentaire (Français)", blank=True, null=True)
    comment_en = models.TextField(verbose_name="Comment (English)", blank=True, null=True)
    comment_ar = models.TextField(verbose_name="تعليق (Arabe)", blank=True, null=True)

    # Lien vidéo (URL) — champ texte pour coller YouTube/Vimeo/hosted link
    lien_video = models.URLField(max_length=2000, verbose_name="Lien vidéo", blank=False)

    # Cover image — forcée sur Cloudinary via MediaCloudinaryStorage
    cover_image = models.ImageField(
        storage=MediaCloudinaryStorage(),
        upload_to="videotheque/covers/",
        verbose_name="Image de couverture",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title_fr or (self.title_en or "Video")

    class Meta:
        verbose_name = "Video"
        verbose_name_plural = "Videothèque"
        ordering = ("-created_at",)
#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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