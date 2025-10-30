from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


# # Serializer pour le modèle Blog
# class BlogSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Blog
#         fields = '__all__'  # Inclure tous les champs





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


# # Serializer pour le modèle Todo
# class TodoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Todo
#         fields = ['id', 'name', 'completed']






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

from rest_framework import serializers
from .models import FondationTamkine

class FondationTamkineSerializer(serializers.ModelSerializer):
    class Meta:
        model = FondationTamkine
        fields = ['id', 'title_fr', 'title_en', 'title_ar', 
                  'description_fr', 'description_en', 'description_ar', 
                  'image']


# serializers.py
from rest_framework import serializers
from .models import MotPresident

class MotPresidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MotPresident
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

# from rest_framework import serializers
# from .models import Platform

# class PlatformSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Platform
#         fields = ['id', 'title', 'description', 'link', 'created_at']
from rest_framework import serializers
from .models import PlatformLink

class PlatformLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformLink
        fields = '__all__'  # OU liste exacte : ['title_fr', 'title_en', ..., 'icon']






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
from .models import Fondation, Programme, PlatformLink


# from rest_framework import serializers

# class BlogSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Blog
#         fields = [
#             'id',
#             'title_fr', 'title_en', 'title_ar',
#             'content_fr', 'content_en', 'content_ar',
#             'image', 'created_at'
#         ]






    # def get_image(self, obj):
    #     request = self.context.get('request')
    #     return request.build_absolute_uri(obj.image.url) if obj.image else None


# class VideoSerializer(serializers.ModelSerializer):
#     couverture = serializers.SerializerMethodField()

#     class Meta:
#         model = Video
#         fields = ['id', 'titre', 'lien', 'couverture']

#     def get_couverture(self, obj):
#         request = self.context.get('request')
#         return request.build_absolute_uri(obj.couverture.url) if obj.couverture else None


class ProgrammeSerializer(serializers.ModelSerializer):
    photo_couverture = serializers.SerializerMethodField()

    class Meta:
        model = Programme
        fields = ['id', 'title', 'description', 'photo_couverture']

    def get_photo_couverture(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.photo_couverture.url) if obj.photo_couverture else None


class PlatformLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformLink
        fields = '__all__'  # OU liste exacte : ['title_fr', 'title_en', ..., 'icon']


    def get_icon(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.icon.url) if obj.icon else None

##########################################################################

# from rest_framework import serializers
# from .models import Activity

# class ActivitySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Activity
#         fields = '__all__'
#         extra_kwargs = {
#             'cover_photo': {'required': False, 'allow_null': True},
#         }
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



# serializers.py
from rest_framework import serializers
from .models import Programme

class ProgrammeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programme
        fields = '__all__'



# from rest_framework import serializers
# from .models import Partenaire

# class PartenaireSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Partenaire
#         fields = '__all__'

#////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from rest_framework import serializers
from .models import Photo

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


from rest_framework import serializers
from .models import Video

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = [
            "id",
            "title_fr", "title_en", "title_ar",
            "comment_fr", "comment_en", "comment_ar",
            "lien_video",
            "cover_image",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
from rest_framework import serializers
from .models import News

class NewsSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = News
        fields = [
            "id",
            "title_fr", "title_en", "title_ar",
            "content_fr", "content_en", "content_ar",
            "image", "image_url",
            "created_at",
        ]
        read_only_fields = ["id", "created_at", "image_url"]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image:
            # cloudinary donne une URL publique via .url
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None
#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
from rest_framework import serializers
from .models import Match

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["home_team_logo"] = (
            instance.home_team_logo.url if instance.home_team_logo else None
        )
        data["away_team_logo"] = (
            instance.away_team_logo.url if instance.away_team_logo else None
        )
        data["banner_image"] = (
            instance.banner_image.url if instance.banner_image else None
        )
        return data



#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# base/serializers.py
from rest_framework import serializers
from .models import Partner

class PartnerSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Partner
        fields = [
            'id',
            'name_fr',
            'name_en',
            'website_url',
            'cover_image',
            'cover_image_url',
            'created_at',
            'updated_at',
        ]

    def get_cover_image_url(self, obj):
        if obj.cover_image:
            return obj.cover_image.url
        return None
