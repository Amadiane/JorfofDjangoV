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






from rest_framework import serializers
from .models import TeamMessage

class TeamMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMessage
        fields = '__all__'

from .models import Fondation

class FondationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fondation
        fields = '__all__'



# # serializers.py
from rest_framework import serializers
from .models import Mission

class MissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mission
        fields = ['id', 'title_fr', 'title_en', 'title_ar', 
                  'content_fr', 'content_en', 'content_ar', 
                  'created_at']
 # ou sans 'title' si tu ne veux pas l'utiliser




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




#Fil d'actualité
from rest_framework import serializers
from .models import Blog, Fondation, Video, Programme, PlatformLink


from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'image', 'author', 'slug', 'tags', 'created_at']  # Utilisez 'title' et non 'titre'



class FondationSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Fondation
        fields = ['id', 'titre', 'description', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url) if obj.image else None


class VideoSerializer(serializers.ModelSerializer):
    couverture = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ['id', 'titre', 'lien', 'couverture']

    def get_couverture(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.couverture.url) if obj.couverture else None


class ProgrammeSerializer(serializers.ModelSerializer):
    photo_couverture = serializers.SerializerMethodField()

    class Meta:
        model = Programme
        fields = ['id', 'title', 'description', 'photo_couverture']

    def get_photo_couverture(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.photo_couverture.url) if obj.photo_couverture else None


class PlatformLinkSerializer(serializers.ModelSerializer):
    icon = serializers.SerializerMethodField()

    class Meta:
        model = PlatformLink
        fields = ['id', 'name', 'description', 'url', 'icon', 'added_at']

    def get_icon(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.icon.url) if obj.icon else None



from rest_framework import serializers
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'
        extra_kwargs = {
            'cover_photo': {'required': False, 'allow_null': True},
        }



from rest_framework import serializers
from .models import Valeur  # Assurez-vous que le modèle Valeur existe dans models.py

class ValeurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Valeur
        fields = '__all__'  # ou liste de champs spécifiques si nécessaire
