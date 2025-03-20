# blog/admin.py

from django.contrib import admin
from .models import Blog

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')  # Fields to display in the list view
    search_fields = ('title', 'author', 'content')  # Fields to search in the admin interface
    list_filter = ('created_at', 'author')  # Filters to apply in the admin interface
    ordering = ('-created_at',)  # Default ordering of the list view