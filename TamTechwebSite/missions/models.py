from django.db import models

# Create your models here.
from django.db import models

class Mission(models.Model):
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    title_ar = models.CharField(max_length=255)

    content_fr = models.TextField()
    content_en = models.TextField()
    content_ar = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title_fr