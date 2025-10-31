from django.contrib import admin
from django.utils.html import format_html
from .models import (
    PlatformLink,
    Photo,
    Video,
    News,
    Match,
    Partner
)

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# # 🌐 PLATFORM LINK
# @admin.register(PlatformLink)
# class PlatformLinkAdmin(admin.ModelAdmin):
#     list_display = ("id", "name", "url")
#     search_fields = ("name", "url")

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# 🖼️ PHOTO
# @admin.register(Photo)
# class PhotoAdmin(admin.ModelAdmin):
#     list_display = ("id", "preview", "title_fr", "created_at")
#     list_display_links = ("id", "title_fr")
#     search_fields = ("title_fr", "comment_fr")
#     list_filter = ("created_at",)
#     readonly_fields = ("preview",)

#     def preview(self, obj):
#         if obj.image:
#             return format_html(
#                 f'<img src="{obj.image.url}" width="80" height="80" '
#                 f'style="object-fit: cover; border-radius: 8px;" />'
#             )
#         return "Aucune image"
#     preview.short_description = "Aperçu"

#     fieldsets = (
#         ("Informations principales", {"fields": ("title_fr", "title_en", "title_ar")}),
#         ("Commentaires", {"fields": ("comment_fr", "comment_en", "comment_ar")}),
#         ("Image", {"fields": ("image", "preview")}),
#     )

from django.contrib import admin
from .models import Album, Photo

@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('title_fr', 'title_en', 'created_at')
    search_fields = ('title_fr', 'title_en')
    list_filter = ('created_at',)


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('title_fr', 'album', 'created_at')
    search_fields = ('title_fr', 'title_en')
    list_filter = ('album', 'created_at')

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# 🎬 VIDEO
@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ("id", "title_fr", "lien_video", "created_at")
    search_fields = ("title_fr", "title_en", "title_ar", "comment_fr")

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# 📰 NEWS
@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ("id", "title_fr", "created_at")
    search_fields = ("title_fr", "title_en", "content_fr")

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# ⚽ MATCH
try:
    admin.site.unregister(Match)
except admin.sites.NotRegistered:
    pass

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
    search_fields = ("home_team_name_fr", "away_team_name_fr", "location_fr")
    list_filter = ("match_date",)
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        ("🏠 Équipe Domicile", {
            "fields": (
                "home_team_name_fr", "home_team_name_en", "home_team_name_ar",
                "home_team_logo"
            )
        }),
        ("🏀 Équipe Adverse", {
            "fields": (
                "away_team_name_fr", "away_team_name_en", "away_team_name_ar",
                "away_team_logo"
            )
        }),
        ("📍 Détails du Match", {
            "fields": ("location_fr", "location_en", "location_ar", "match_date", "match_time")
        }),
        ("🧾 Description", {
            "fields": ("description_fr", "description_en", "description_ar")
        }),
        ("🏆 Résultat & Affiche", {
            "fields": ("home_score", "away_score", "banner_image")
        }),
        ("📅 Métadonnées", {
            "fields": ("created_at", "updated_at")
        }),
    )

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# base/admin.py
from django.contrib import admin
from .models import Partner

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name_fr', 'name_en', 'website_url', 'created_at')
    search_fields = ('name_fr', 'name_en')
    list_filter = ('created_at',)
