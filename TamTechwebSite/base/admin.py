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
    list_display = ("title_fr", "title_en", "image")


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ("title_fr", "album", "image")

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

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from django.contrib import admin
from .models import MotPresident

@admin.register(MotPresident)
class MotPresidentAdmin(admin.ModelAdmin):
    list_display = ('id', 'title_fr', 'title_en', 'title_ar', 'image')
    search_fields = ('title_fr', 'title_en', 'title_ar')
    list_filter = ('title_fr',)
    ordering = ('-id',)

    fieldsets = (
        ('Titres', {
            'fields': ('title_fr', 'title_en', 'title_ar')
        }),
        ('Descriptions', {
            'fields': ('description_fr', 'description_en', 'description_ar')
        }),
        ('Image', {
            'fields': ('image',)
        }),
    )

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


from django.contrib import admin
from .models import Valeur


@admin.register(Valeur)
class ValeurAdmin(admin.ModelAdmin):
    list_display = ('id', 'title_fr', 'title_en', 'title_ar', 'image_preview')
    search_fields = ('title_fr', 'title_en', 'title_ar')
    list_filter = ('title_fr',)
    ordering = ('-id',)

    readonly_fields = ('image_preview',)

    fieldsets = (
        ('Informations principales', {
            'fields': ('title_fr', 'title_en', 'title_ar', 'description_fr', 'description_en', 'description_ar')
        }),
        ('Image', {
            'fields': ('image', 'image_preview')
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="100" height="100" style="object-fit: cover; border-radius: 8px;" />'
        return "Aucune image"
    image_preview.allow_tags = True
    image_preview.short_description = "Aperçu de l'image"


#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from django.contrib import admin
from .models import Mission
from django.utils.html import format_html


@admin.register(Mission)
class MissionAdmin(admin.ModelAdmin):
    list_display = ('title_fr', 'title_en', 'created_at', 'preview_image')
    list_filter = ('created_at',)
    search_fields = ('title_fr', 'title_en', 'content_fr')
    readonly_fields = ('preview_image', 'created_at')  # ✅ ajouté ici

    fieldsets = (
        ("Titres", {
            'fields': ('title_fr', 'title_en', 'title_ar')
        }),
        ("Contenus", {
            'fields': ('content_fr', 'content_en', 'content_ar')
        }),
        ("Image", {
            'fields': ('image', 'preview_image')
        }),
        # ❌ On supprime la section "Dates" ou on la garde en lecture seule
        ("Informations automatiques", {
            'fields': ('created_at',),
        }),
    )

    def preview_image(self, obj):
        """Affiche un aperçu de l'image dans l'admin."""
        if obj.image:
            return format_html(
                '<img src="{}" width="100" height="100" style="object-fit:cover; border-radius:6px;" />',
                obj.image.url
            )
        return "Aucune image"

    preview_image.short_description = "Aperçu"

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from django.contrib import admin
from django.utils.html import format_html
from .models import EquipeMember


@admin.register(EquipeMember)
class EquipeMemberAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'role', 'position', 'number', 'preview_photo')
    list_filter = ('role', 'nationality')
    search_fields = ('first_name', 'last_name', 'role', 'nationality')
    readonly_fields = ('preview_photo', 'created_at', 'updated_at')

    fieldsets = (
        ("Identité", {
            'fields': ('first_name', 'last_name', 'role', 'position', 'number')
        }),
        ("Informations physiques", {
            'fields': ('height', 'weight', 'nationality')
        }),
        ("Description", {
            'fields': ('bio_fr', 'bio_en')
        }),
        ("Photo", {
            'fields': ('photo', 'preview_photo')
        }),
        ("Dates", {
            'fields': ('created_at', 'updated_at'),
        }),
    )

    def preview_photo(self, obj):
        if obj.photo:
            return format_html('<img src="{}" width="80" height="80" style="object-fit:cover;border-radius:8px;"/>', obj.photo.url)
        return "Aucune photo"
    preview_photo.short_description = "Aperçu"

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


from django.contrib import admin
from .models import Contact
from django.utils.html import format_html

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'email',
        'subject',
        'category',
        'created_at',
        'has_attachment',
    )
    list_filter = ('category', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('created_at', 'preview_attachment')

    fieldsets = (
        ("Informations du contact", {
            'fields': ('name', 'email', 'subject', 'category', 'message')
        }),
        ("Pièce jointe (optionnelle)", {
            'fields': ('attachment', 'preview_attachment')
        }),
        ("Méta", {
            'fields': ('created_at',),
        }),
    )

    def has_attachment(self, obj):
        return bool(obj.attachment)
    has_attachment.boolean = True
    has_attachment.short_description = "Pièce jointe ?"

    def preview_attachment(self, obj):
        """Affiche l'image Cloudinary dans l'admin si disponible."""
        if obj.attachment:
            return format_html('<img src="{}" width="200" style="border-radius:8px;" />', obj.attachment.url)
        return "Aucune image"
    preview_attachment.short_description = "Aperçu de la pièce jointe"

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
from django.contrib import admin
from .models import Home

@admin.register(Home)
class HomeAdmin(admin.ModelAdmin):
    list_display = ("title_fr", "created_at", "updated_at")
    search_fields = ("title_fr", "title_en")
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        ("Contenu principal", {
            "fields": (
                "title_fr", "title_en",
                "description_fr", "description_en",
                "image",
            ),
        }),
        ("Dates", {
            "fields": ("created_at", "updated_at"),
        }),
    )
