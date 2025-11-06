# from django.db import models
# from django.utils.text import slugify
# from django.contrib.auth.models import User

# # Modèle Blog
# from django.db import models

# class Blog(models.Model):
#     title_fr = models.CharField(max_length=255)
#     title_en = models.CharField(max_length=255)
#     title_ar = models.CharField(max_length=255)
    
#     content_fr = models.TextField()
#     content_en = models.TextField()
#     content_ar = models.TextField()
    
#     image = models.ImageField(upload_to="images/", blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title_fr



# # Modèle Todo
# class Todo(models.Model):
#     name = models.CharField(max_length=200)
#     completed = models.BooleanField(default=False)
#     owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')  # Correction du nom de la relation

#     def __str__(self):
#         return self.name





from django.db import models

class TeamMessage(models.Model):
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    title_ar = models.CharField(max_length=255)

    content_fr = models.TextField()
    content_en = models.TextField()
    content_ar = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title_fr  # Ou autre langue si tu préfères











# models.py

# from django.db import models

# class Platform(models.Model):
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     link = models.URLField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title

#Pour l'admin pour GET les clients qui ont rempli le formulaire en ligne

# models.py





#Rejoindre
# base/models.py

from django.db import models

class ContactMessage(models.Model):
    organisation = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    date_envoye = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.organisation} - {self.email}"



# #ComminityContact

# from django.db import models

# class CommunityContact(models.Model):
#     nom = models.CharField(max_length=100)
#     prenom = models.CharField(max_length=100)
#     role = models.CharField(max_length=100)
#     tel = models.CharField(max_length=20)
#     email = models.EmailField()
#     conditions = models.BooleanField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.nom} {self.prenom}"




# partners/models.py
from django.db import models

class Partner(models.Model):
    ROLE_CHOICES = [
        ('enseignant', 'Enseignant'),
        ('parent', 'Parent d\'élève'),
        ('eleve', 'Élève'),
        ('autre', 'Autre'),
    ]
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    organisation = models.CharField(max_length=200)
    website_url = models.URLField(max_length=200)
    phone = models.CharField(max_length=20)
    accept_terms = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"






#PlateformeLink
# from django.db import models

# class PlatformLink(models.Model):
#     name = models.CharField(max_length=100)
#     description = models.TextField(blank=True)
#     url = models.URLField()
#     icon = models.ImageField(upload_to='platform_icons/', blank=True, null=True)  # optionnel
#     added_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.name

from django.db import models

class PlatformLink(models.Model):
    title_fr = models.CharField(max_length=100)
    title_en = models.CharField(max_length=100)
    title_ar = models.CharField(max_length=100)

    description_fr = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    description_ar = models.TextField(blank=True)

    url = models.URLField()
    icon = models.ImageField(upload_to='platform_icons/', blank=True, null=True)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title_fr  # ou autre selon ta préférence




# from django.db import models

# class MotPresident(models.Model):
#     titre_fr = models.CharField(max_length=255)
#     titre_en = models.CharField(max_length=255)
#     titre_ar = models.CharField(max_length=255)

#     description_fr = models.TextField()
#     description_en = models.TextField()
#     description_ar = models.TextField()

#     image = models.ImageField(upload_to='mot_president')  # dossier media/mot_president/

#     def __str__(self):
#         return self.titre_fr


























#Fondation Tamkine
# models.py
from django.db import models

class Fondation(models.Model):
    titre = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='fondations')  # Stockée dans media/fondations/

    def __str__(self):
        return self.titre

from django.db import models

class FondationTamkine(models.Model):
    title_fr = models.CharField(max_length=100)
    title_en = models.CharField(max_length=100)
    title_ar = models.CharField(max_length=100)

    description_fr = models.TextField()
    description_en = models.TextField()
    description_ar = models.TextField()

    image = models.ImageField(upload_to='fondation_images/', null=True, blank=True)  # Ajout du champ image

    def __str__(self):
        return self.title_fr










# #NosValeurs
# from django.db import models

# class Valeur(models.Model):
#     titre = models.CharField(max_length=255)
#     description = models.TextField()
#     image = models.ImageField(upload_to='valeurs')  # L'image sera stockée dans media/valeurs/

#     def __str__(self):
#         return self.titre





# #Programs
# from django.db import models

# class Programme(models.Model):
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     photo_couverture = models.ImageField(upload_to='programmes/')

#     def __str__(self):
#         return self.title
# models.py
# models.py
from django.db import models

class Programme(models.Model):
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    title_ar = models.CharField(max_length=255)

    description_fr = models.TextField()
    description_en = models.TextField()
    description_ar = models.TextField()

    photo_couverture = models.ImageField(upload_to='programmes/')

    def __str__(self):
        return self.title_fr





# #AddVideos
# # models.py
# from django.db import models

# class Video(models.Model):
#     titre = models.CharField(max_length=255)
#     lien = models.URLField()
#     couverture = models.ImageField(upload_to='videos_couvertures/')

#     def __str__(self):
#         return self.titre



# addphoto

# models.py
# from django.db import models

# class MediaContent(models.Model):
#     titre = models.CharField(max_length=255)
#     description = models.TextField()
#     image = models.ImageField(upload_to='media_content/')  # Les images seront enregistrées dans media/media_content/

#     def __str__(self):
#         return self.titre
#////////////////////////////////////////////////////////////////////////////////////
# from django.db import models
# from cloudinary_storage.storage import MediaCloudinaryStorage

# class MediaContent(models.Model):
#     titre = models.CharField(max_length=200)
#     description = models.TextField(blank=True)
#     image = models.ImageField(storage=MediaCloudinaryStorage(), upload_to='media_content/')
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.titre
#////////////////////////////////////////////////////////////////////////////////////





#Document

from django.db import models

class Document(models.Model):
    titre = models.CharField(max_length=255)
    couverture = models.ImageField(upload_to='couvertures/')
    fichier = models.FileField(upload_to='documents/')

    def __str__(self):
        return self.titre


# #mediapartners

# from django.db import models

# class Partenaire(models.Model):
#     titre_fr = models.CharField(max_length=255)
#     titre_en = models.CharField(max_length=255)
#     titre_ar = models.CharField(max_length=255)
    
#     description_fr = models.TextField()
#     description_en = models.TextField()
#     description_ar = models.TextField()
    
#     couverture = models.ImageField(upload_to='partenaires/')
#     site_url = models.URLField()

#     def __str__(self):
#         return self.titre_fr  # Ou choisir la langue principale








# class Activity(models.Model):
#     title = models.CharField(max_length=255)
#     cover_photo = models.ImageField(upload_to='activity_covers/')
#     comment = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title

from django.db import models

class Activity(models.Model):
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    title_ar = models.CharField(max_length=255)
    comment_fr = models.TextField(blank=True)
    comment_en = models.TextField(blank=True)
    comment_ar = models.TextField(blank=True)
    cover_photo = models.ImageField(upload_to='activity_covers/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title_fr













#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# from django.db import models
# from cloudinary_storage.storage import MediaCloudinaryStorage

# class Photo(models.Model):
#     # Titres multilingues
#     title_fr = models.CharField(max_length=255, verbose_name="Titre (Français)")
#     title_en = models.CharField(max_length=255, verbose_name="Title (English)", blank=True, null=True)
#     title_ar = models.CharField(max_length=255, verbose_name="العنوان (Arabe)", blank=True, null=True)

#     # Commentaires multilingues
#     comment_fr = models.TextField(verbose_name="Commentaire (Français)", blank=True, null=True)
#     comment_en = models.TextField(verbose_name="Comment (English)", blank=True, null=True)
#     comment_ar = models.TextField(verbose_name="تعليق (Arabe)", blank=True, null=True)

#     # Image Cloudinary
#     image = models.ImageField(
#         storage=MediaCloudinaryStorage(),
#         upload_to="phototheque/",
#         verbose_name="Image"
#     )

#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title_fr or "Photo"

#     class Meta:
#         verbose_name = "Photo"
#         verbose_name_plural = "Photothèque"

# models.py
from django.db import models

class Album(models.Model):
    title_fr = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200)
    description_fr = models.TextField()
    description_en = models.TextField()
    image = models.URLField(blank=True, null=True)  # lien Cloudinary

    def __str__(self):
        return self.title_fr


class Photo(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name="photos")
    title_fr = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200)
    comment_fr = models.TextField(blank=True, null=True)
    comment_en = models.TextField(blank=True, null=True)
    image = models.URLField(blank=True, null=True)  # lien Cloudinary

    def __str__(self):
        return self.title_fr


#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from django.db import models
from cloudinary.models import CloudinaryField
import cloudinary.uploader

class Match(models.Model):
    home_team_name_fr = models.CharField(max_length=255)
    home_team_name_en = models.CharField(max_length=255)
    home_team_name_ar = models.CharField(max_length=255)
    home_team_logo = CloudinaryField('home_team_logo', blank=True, null=True)

    away_team_name_fr = models.CharField(max_length=255)
    away_team_name_en = models.CharField(max_length=255)
    away_team_name_ar = models.CharField(max_length=255)
    away_team_logo = CloudinaryField('away_team_logo', blank=True, null=True)

    location_fr = models.CharField(max_length=255)
    location_en = models.CharField(max_length=255)
    location_ar = models.CharField(max_length=255)

    match_date = models.DateField()
    match_time = models.TimeField()

    description_fr = models.TextField(blank=True, null=True)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)

    home_score = models.PositiveIntegerField(default=0)
    away_score = models.PositiveIntegerField(default=0)

    banner_image = CloudinaryField('match_banner', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-match_date', '-match_time']

    def __str__(self):
        return f"{self.home_team_name_en} vs {self.away_team_name_en}"

    def save(self, *args, **kwargs):
        """
        Forcer l'upload des images locales vers Cloudinary avant la sauvegarde
        """
        if self.home_team_logo and not str(self.home_team_logo).startswith("http"):
            upload_result = cloudinary.uploader.upload(self.home_team_logo)
            self.home_team_logo = upload_result["public_id"]

        if self.away_team_logo and not str(self.away_team_logo).startswith("http"):
            upload_result = cloudinary.uploader.upload(self.away_team_logo)
            self.away_team_logo = upload_result["public_id"]

        if self.banner_image and not str(self.banner_image).startswith("http"):
            upload_result = cloudinary.uploader.upload(self.banner_image)
            self.banner_image = upload_result["public_id"]

        super().save(*args, **kwargs)



#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# base/models.py
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

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from django.db import models
from cloudinary.models import CloudinaryField

class MotPresident(models.Model):
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True, null=True)
    title_ar = models.CharField(max_length=255, blank=True, null=True)

    description_fr = models.TextField()
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)

    image = CloudinaryField(
        'Image du Président',
        folder='mot_president',
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Mot du Président"
        verbose_name_plural = "Mots du Président"
        ordering = ['-created_at']

    def __str__(self):
        return self.title_fr


#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
from django.db import models

class Valeur(models.Model):
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True, null=True)
    title_ar = models.CharField(max_length=255, blank=True, null=True)

    description_fr = models.TextField()
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)

    image = CloudinaryField (
        'Nos Valeurs',
        folder= 'valeur',
        blank = True,
        null = True
    )

    def __str__(self):
        return self.title_fr

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# from django.db import models

# class Mission(models.Model):
#     title_fr = models.CharField(max_length=255)
#     title_en = models.CharField(max_length=255)
#     title_ar = models.CharField(max_length=255)

#     content_fr = models.TextField()
#     content_en = models.TextField()
#     content_ar = models.TextField()

#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title_fr


#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from django.db import models
from cloudinary.models import CloudinaryField

class Mission(models.Model):
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    title_ar = models.CharField(max_length=255)

    content_fr = models.TextField()
    content_en = models.TextField()
    content_ar = models.TextField()

    # ✅ On utilise CloudinaryField pour l'image
    image = CloudinaryField(
        'Image de la mission',
        folder='missions',  # Le dossier où Cloudinary va stocker les images
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Mission"
        verbose_name_plural = "Missions"
        ordering = ['-created_at']

    def __str__(self):
        return self.title_fr


#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



from django.db import models
from cloudinary.models import CloudinaryField
from django.utils import timezone


class EquipeMember(models.Model):
    ROLE_CHOICES = [
        ('player', 'Joueur'),
        ('coach', 'Entraîneur'),
        ('assistant', 'Assistant'),
        ('staff', 'Staff technique'),
        ('manager', 'Manager'),
    ]

    # ✅ Informations de base
    first_name = models.CharField(max_length=100, verbose_name="Prénom")
    last_name = models.CharField(max_length=100, verbose_name="Nom")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='player', verbose_name="Rôle")

    # ✅ Détails sportifs / professionnels
    position = models.CharField(max_length=100, blank=True, null=True, verbose_name="Poste (ex: Meneur, Pivot)")
    height = models.CharField(max_length=20, blank=True, null=True, verbose_name="Taille (ex: 2m03)")
    weight = models.CharField(max_length=20, blank=True, null=True, verbose_name="Poids (ex: 98 kg)")
    nationality = models.CharField(max_length=100, blank=True, null=True, verbose_name="Nationalité")
    number = models.PositiveIntegerField(blank=True, null=True, verbose_name="Numéro sur le maillot")

    # ✅ Description multilingue
    bio_fr = models.TextField(blank=True, null=True, verbose_name="Biographie (FR)")
    bio_en = models.TextField(blank=True, null=True, verbose_name="Biography (EN)")

    # ✅ Image stockée sur Cloudinary
    photo = CloudinaryField(
        'Photo',
        folder='equipe',
        blank=True,
        null=True
    )

    # ✅ Dates
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Membre de l'équipe"
        verbose_name_plural = "Équipe"
        ordering = ['role', 'last_name']

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.get_role_display()})"



#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from django.db import models

class Contact(models.Model):
    CATEGORY_CHOICES = [
        ('commentaire', 'Commentaires et suggestions'),
        ('question', 'Questions générales'),
        ('support', 'Support technique'),
        ('partenariat', 'Partenariat'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


from django.db import models

class Community(models.Model):
    ROLE_CHOICES = [
        ("benevole", "Bénévole"),
        ("entraineur", "Entraîneur"),
        ("joueur", "Joueur"),
        ("supporter", "Supporter"),
        ("autres", "Autres"),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField()
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_replied = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.get_role_display()})"
#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from django.db import models

class Newsletter(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_confirmed = models.BooleanField(default=False)
    is_replied = models.BooleanField(default=False)

    def __str__(self):
        return self.email

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from django.db import models
from cloudinary.models import CloudinaryField

class Home(models.Model):
    title_fr = models.CharField(max_length=255, verbose_name="Titre (FR)")
    title_en = models.CharField(max_length=255, blank=True, null=True, verbose_name="Titre (EN)")
    description_fr = models.TextField(verbose_name="Description (FR)")
    description_en = models.TextField(blank=True, null=True, verbose_name="Description (EN)")
    image = CloudinaryField('image', folder='home', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Page d'accueil"
        verbose_name_plural = "Pages d'accueil"

    def __str__(self):
        return self.title_fr or "Accueil"
