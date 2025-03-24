from django.db import models
from django.utils.text import slugify

# Create your models here.

class Blog(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to="images" ,blank=True, null=True)
    author= models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    tags = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)


    def save(self, *args, **kwargs):
        if not self.slug:
            # Generate a unique slug based on the title
            slug = slugify(self.title)
            unique_slug = slug
            number = 1
            while Blog.objects.filter(slug=unique_slug).exists():
                unique_slug = f"{slug}-{number}"
                number += 1
            self.slug = unique_slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title









from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
    name = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todo')
    