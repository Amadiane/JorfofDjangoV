# blog/admin.py

# from django.contrib import admin
# from .models import Blog

# from django.contrib import admin
# from .models import Blog

# @admin.register(Blog)
# class BlogAdmin(admin.ModelAdmin):
#     list_display = ['title_fr', 'created_at']
#     list_filter = ['created_at']



# from django.contrib import admin
# from .models import Todo

# # Register your models here.
# admin.site.register(Todo)


# admin.py

from django.contrib import admin
from .models import PlatformLink

admin.site.register(PlatformLink)



from django.contrib import admin
# from .models import MediaContent

# @admin.register(MediaContent)
# class MediaContentAdmin(admin.ModelAdmin):
#     list_display = ('id', 'titre', 'description', 'image')

#///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


from django.contrib import admin
from .models import Photo
from django.utils.html import format_html


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ("id", "preview", "title_fr", "created_at")
    list_display_links = ("id", "title_fr")
    search_fields = ("title_fr", "comment_fr")
    list_filter = ("created_at",)
    readonly_fields = ("preview",)

    # Pour afficher une miniature de l’image
    def preview(self, obj):
        if obj.image:
            return format_html(f'<img src="{obj.image.url}" width="80" height="80" style="object-fit: cover; border-radius: 8px;" />')
        return "Aucune image"
    preview.short_description = "Aperçu"

    fieldsets = (
        ("Informations principales", {
            "fields": ("title_fr", "title_en", "title_ar")
        }),
        ("Commentaires", {
            "fields": ("comment_fr", "comment_en", "comment_ar")
        }),
        ("Image", {
            "fields": ("image", "preview")
        }),
    )
#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from django.contrib import admin
from .models import Video

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ("id", "title_fr", "lien_video", "created_at")
    search_fields = ("title_fr", "title_en", "title_ar", "comment_fr")
#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from django.contrib import admin
from .models import News

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ("id", "title_fr", "created_at")
    search_fields = ("title_fr", "title_en", "content_fr")
#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
from django.contrib import admin
from .models import Match

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = (
        "home_team_name_fr",
        "away_team_name_fr",
        "match_date",
        "match_time",
        "home_score",
        "away_score",
        "location_fr",
    )
    search_fields = (
        "home_team_name_fr",
        "away_team_name_fr",
        "location_fr",
    )
    list_filter = ("match_date",)
    readonly_fields = ("created_at", "updated_at")


#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////