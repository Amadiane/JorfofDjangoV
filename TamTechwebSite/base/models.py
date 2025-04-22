from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User

# Modèle Blog
class Blog(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to="images/", blank=True, null=True)  # Correction du chemin d'image
    author = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    tags = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            # Générer un slug unique basé sur le titre
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


# Modèle Todo
class Todo(models.Model):
    name = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')  # Correction du nom de la relation

    def __str__(self):
        return self.name


# Modèle MotPresi
class MotPresi(models.Model):
    titre = models.CharField(max_length=255)
    texte = models.TextField()
    auteur = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)  # Ajout du champ image

    def __str__(self):
        return self.titre


# Modèle TeamMessage
class TeamMessage(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content[:50]



# models.py
from django.db import models

class Mission(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title




# models.py

from django.db import models

class Platform(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

#Pour l'admin pour GET les clients qui ont rempli le formulaire en ligne

# models.py

from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"



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



#ComminityContact

from django.db import models

class CommunityContact(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    tel = models.CharField(max_length=20)
    email = models.EmailField()
    conditions = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nom} {self.prenom}"



#ComminityParter
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


#Newletter
from django.db import models

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email



#PlateformeLink
from django.db import models

class PlatformLink(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    url = models.URLField()
    icon = models.ImageField(upload_to='platform_icons/', blank=True, null=True)  # optionnel
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name



#NosValeurs
from django.db import models

class Valeur(models.Model):
    titre = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='valeurs')  # L'image sera stockée dans media/valeurs/

    def __str__(self):
        return self.titre


#Programs
from django.db import models

class Program(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title

