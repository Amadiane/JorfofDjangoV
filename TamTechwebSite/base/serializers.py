from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Blog, Todo


# Serializer pour le modèle Blog
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'  # Inclure tous les champs


# Serializer pour l'enregistrement d'un utilisateur
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


# Serializer pour l'utilisateur connecté
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


# Serializer pour le modèle Todo
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'name', 'completed']


# serializers.py
from rest_framework import serializers
from .models import MotPresi

class MotPresiSerializer(serializers.ModelSerializer):
    class Meta:
        model = MotPresi
        fields = ['titre', 'texte', 'auteur']
        # Vous pouvez ajouter une validation personnalisée ici si nécessaire



from rest_framework import serializers
from .models import TeamMessage

class TeamMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMessage
        fields = '__all__'



# serializers.py
from rest_framework import serializers
from .models import Mission

class MissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mission
        fields = ['id', 'title', 'content', 'created_at']  # ou sans 'title' si tu ne veux pas l'utiliser




# serializers.py

from rest_framework import serializers
from .models import Platform

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ['id', 'title', 'description', 'link', 'created_at']



#Pour l'admin pour GET les clients qui ont rempli le formulaire en ligne

# serializers.py

# serializers.py

from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'




#nous rejoindre

from rest_framework import serializers
from .models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'


#ComminityContact
# serializers.py
from rest_framework import serializers
from .models import CommunityContact

class CommunityContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityContact
        fields = '__all__'

#ComminityPartner
# partners/serializers.py
from rest_framework import serializers
from .models import Partner

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ['id', 'first_name', 'last_name', 'email', 'role', 'organisation', 'website_url', 'phone', 'accept_terms', 'created_at']

