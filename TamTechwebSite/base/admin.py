# blog/admin.py

from django.contrib import admin
from .models import Blog

from django.contrib import admin
from .models import Blog

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ['title_fr', 'created_at']
    list_filter = ['created_at']



from django.contrib import admin
from .models import Todo

# Register your models here.
admin.site.register(Todo)


# admin.py

from django.contrib import admin
from .models import PlatformLink

admin.site.register(PlatformLink)
