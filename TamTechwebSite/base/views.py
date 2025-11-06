from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated

# Create your views here.

from rest_framework.permissions import AllowAny
from rest_framework import viewsets

from rest_framework import viewsets

# class BlogViewSet(viewsets.ModelViewSet):
#     queryset = Blog.objects.all().order_by('-created_at')
#     serializer_class = BlogSerializer



from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken

from datetime import datetime, timedelta


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.error)

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # Vérifie manuellement l'utilisateur
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({'success': False, 'message': 'Nom d’utilisateur ou mot de passe incorrect'}, status=status.HTTP_200_OK)

        response = super().post(request, *args, **kwargs)
        tokens = response.data

        res = Response({
            'success': True,
            'access': tokens['access'],
            'refresh': tokens['refresh'],
            'username': user.username,
            'is_superuser': user.is_superuser
        })

        res.set_cookie(
            key='access_token',
            value=str(tokens['access']),
            httponly=True,
            secure=True,
            samesite='None',
            path='/'
        )

        res.set_cookie(
            key='refresh_token',
            value=str(tokens['refresh']),
            httponly=True,
            secure=True,
            samesite='None',
            path='/'
        )

        return res

        
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)
            
            tokens = response.data
            access_token = tokens['access']

            res = Response()

            res.data = {'refreshed': True}

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False,
                samesite='None',
                path='/'
            )
            return res

        except Exception as e:
            print(e)
            return Response({'refreshed': False})


from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import PermissionDenied

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        # Vérification si l'utilisateur est authentifié
        if not request.user.is_authenticated:
            raise PermissionDenied("You must be authenticated to logout.")

        # Suppression des cookies (access_token et refresh_token)
        res = Response({'success': True})
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('response_token', path='/', samesite='None')

        return res
    except Exception as e:
        print("Error during logout:", e)
        return Response({'success': False, 'error': str(e)}, status=500)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_todos(request):
    user = request.user
    todos = Todo.objects.filter(owner=user)
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_logged_in(request):
    serializer = UserSerializer(request.user, many=False)
    return Response(serializer.data)




from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def chatbot(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_message = data.get("message", "")

        # Simule une réponse du chatbot (à remplacer par un modèle IA ou logique)
        response = {"bot_message": f"Tu as dit : {user_message}"}
        
        return JsonResponse(response)
    
    return JsonResponse({"error": "Méthode non autorisée"}, status=405)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from .models import Contact
from .serializers import ContactSerializer

class ContactAPIView(APIView):
    # GET : Affiche tous les messages reçus
    def get(self, request):
        contacts = Contact.objects.all().order_by('-created_at')  # messages les plus récents d'abord
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)

    # POST : Permet de recevoir un message de contact
    def post(self, request, *args, **kwargs):
        name = request.data.get('name')
        email = request.data.get('email')
        message = request.data.get('message')

        if not name or not email or not message:
            return Response({'error': 'Tous les champs sont requis.'}, status=status.HTTP_400_BAD_REQUEST)

        # Sauvegarder dans la base de données
        contact = Contact.objects.create(name=name, email=email, message=message)

        # ==== Email à l'admin ====
        html_admin_message = render_to_string('emails/contact_admin.html', {
            'name': name,
            'email': email,
            'message': message,
        })
        email_admin = EmailMessage(
            subject=f"Nouveau message de contact de {name}",
            body=html_admin_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=['tonemail@gmail.com'],
            reply_to=[email],
        )
        email_admin.content_subtype = "html"
        email_admin.send()

        # ==== Email de confirmation à l'utilisateur ====
        html_user_message = render_to_string('emails/contact_confirmation.html', {'name': name})
        email_user = EmailMessage(
            subject="Confirmation de votre message",
            body=html_user_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[email],
            reply_to=[settings.DEFAULT_FROM_EMAIL],
        )
        email_user.content_subtype = "html"
        email_user.send()

        return Response({'message': 'Message envoyé avec succès.'}, status=status.HTTP_201_CREATED)


        # DELETE : Supprimer un message de contact via son ID dans les paramètres
    def delete(self, request, id, *args, **kwargs):
        try:
            contact = Contact.objects.get(id=id)
            contact.delete()
            return Response({'message': 'Message supprimé avec succès.'}, status=status.HTTP_204_NO_CONTENT)
        except Contact.DoesNotExist:
            return Response({'error': 'Message introuvable.'}, status=status.HTTP_404_NOT_FOUND)








#Mot d'équipe
from rest_framework import viewsets
from .models import TeamMessage
from .serializers import TeamMessageSerializer

class TeamMessageViewSet(viewsets.ModelViewSet):
    queryset = TeamMessage.objects.all().order_by('-created_at')  # on trie du plus récent au plus ancien
    serializer_class = TeamMessageSerializer



# views.py
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Mission
# from .serializers import MissionSerializer

# @api_view(['GET'])
# def get_last_two_missions(request):
#     missions = Mission.objects.order_by('-created_at')[:2]
#     serializer = MissionSerializer(missions, many=True)
#     return Response(serializer.data)

# @api_view(['POST'])
# def create_mission(request):
#     serializer = MissionSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Mission
from .serializers import MissionSerializer

@api_view(['GET', 'POST'])
def mission_list_create(request):
    if request.method == 'GET':
        missions = Mission.objects.all().order_by('-created_at')
        serializer = MissionSerializer(missions, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def mission_detail(request, pk):
    try:
        mission = Mission.objects.get(pk=pk)
    except Mission.DoesNotExist:
        return Response({'error': 'Mission not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MissionSerializer(mission)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MissionSerializer(mission, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        mission.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)










# views.py

# from rest_framework import viewsets
# from .models import Platform
# from .serializers import PlatformSerializer

# class PlatformViewSet(viewsets.ModelViewSet):
#     queryset = Platform.objects.all()
#     serializer_class = PlatformSerializer



#Nous rejoindre
# base/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class RejoindreAPIView(APIView):
    
    def post(self, request, *args, **kwargs):
        organisation = request.data.get('organisation')
        email = request.data.get('email')
        message = request.data.get('message')

        if not organisation or not email or not message:
            return Response({'message': 'Tous les champs sont requis.'}, status=status.HTTP_400_BAD_REQUEST)

        # Sauvegarde en base de données
        ContactMessage.objects.create(
            organisation=organisation,
            email=email,
            message=message
        )

        # Envoi de l'email à l'admin
        html_admin = render_to_string('emails/rejoindre_admin.html', {
            'organization': organisation,
            'email': email,
            'message': message,
        })

        email_admin = EmailMessage(
            subject=f"Nouvelle demande de contact - {organisation}",
            body=html_admin,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=['tonemail@gmail.com'],
            reply_to=[email]
        )
        email_admin.content_subtype = "html"
        email_admin.send()

        return Response({'message': 'Votre demande a été envoyée avec succès !'}, status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs):
        messages = ContactMessage.objects.all().order_by('-date_envoye')
        serializer = ContactMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, id, *args, **kwargs):
        # Récupérer le message de contact par son ID
        contact_message = get_object_or_404(ContactMessage, id=id)
        # Supprimer le message
        contact_message.delete()
        return Response({'message': 'Message supprimé avec succès.'}, status=status.HTTP_204_NO_CONTENT)








# #ComminityPartner
# # partners/views.py
# from django.core.mail import send_mail
# from django.template.loader import render_to_string
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from .models import Partner
# from .serializers import PartnerSerializer
# from django.conf import settings

# class PartnerAPIView(APIView):
#     # GET : Affiche tous les partenaires
#     def get(self, request):
#         partners = Partner.objects.all().order_by('-created_at')  # Les plus récents d'abord
#         serializer = PartnerSerializer(partners, many=True)
#         return Response(serializer.data)

#     # POST : Permet d'ajouter un partenaire et d'envoyer un email
#     def post(self, request, *args, **kwargs):
#         serializer = PartnerSerializer(data=request.data)
#         if serializer.is_valid():
#             partner = serializer.save()

#             # ==== Envoi d'un email à l'administrateur ====
#             html_admin_message = render_to_string('emails/partner_admin.html', {
#                 'partner': partner,
#             })
#             email_admin = send_mail(
#                 subject=f"Nouveau partenaire enregistré: {partner.first_name} {partner.last_name}",
#                 message=html_admin_message,
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 recipient_list=['admin@example.com'],  # Remplace par l'email de l'admin
#                 html_message=html_admin_message,
#             )

#             # ==== Envoi d'un email de confirmation à l'utilisateur ====
#             html_user_message = render_to_string('emails/partner_admin.html', {'partner': partner})
#             email_user = send_mail(
#                 subject="Confirmation de votre inscription",
#                 message=html_user_message,
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 recipient_list=[partner.email],
#                 html_message=html_user_message,
#             )

#             return Response({'message': 'Partenaire ajouté et confirmation envoyée.'}, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     # DELETE : Supprimer un partenaire spécifique
#     def delete(self, request, *args, **kwargs):
#         try:
#             data = json.loads(request.body)
#             partner_id = data.get("id")
#             if not partner_id:
#                 return JsonResponse({"message": "ID requis pour supprimer."}, status=400)
            
#             partner = Partner.objects.get(id=partner_id)
#             partner.delete()
#             return JsonResponse({"message": "Partenaire supprimé avec succès."}, status=200)
        
#         except Partner.DoesNotExist:
#             return JsonResponse({"message": "Partenaire non trouvé."}, status=404)
#         except json.JSONDecodeError:
#             return JsonResponse({"message": "Erreur de décodage JSON."}, status=400)
#         except Exception as e:
#             return JsonResponse({"message": str(e)}, status=400)











            

#PlateformeLink
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.dateparse import parse_datetime
# from django.core.files.storage import default_storage
# from django.core.files.base import ContentFile
# from django.views.decorators.http import require_http_methods
# import json

# from .models import PlatformLink

# @csrf_exempt
# @require_http_methods(["GET", "POST"])
# def platform_links_api(request):
#     if request.method == "GET":
#         platforms = PlatformLink.objects.all()
#         data = []
#         for platform in platforms:
#             data.append({
#                 "id": platform.id,
#                 "name": platform.name,
#                 "description": platform.description,
#                 "url": platform.url,
#                 "icon": platform.icon.url if platform.icon else None,
#                 "added_at": platform.added_at,
#             })
#         return JsonResponse(data, safe=False)

#     elif request.method == "POST":
#         if request.content_type == 'application/json':
#             try:
#                 body = json.loads(request.body.decode('utf-8'))
#                 name = body.get('name')
#                 description = body.get('description')
#                 url = body.get('url')
#                 added_at = parse_datetime(body.get('added_at')) if body.get('added_at') else None

#                 platform = PlatformLink(
#                     name=name,
#                     description=description,
#                     url=url,
#                     added_at=added_at
#                 )
#                 platform.save()
#                 return JsonResponse({"message": "Plateforme créée avec succès", "id": platform.id}, status=201)
#             except Exception as e:
#                 return JsonResponse({"error": str(e)}, status=400)
        
#         elif request.FILES:
#             try:
#                 name = request.POST.get('name')
#                 description = request.POST.get('description')
#                 url = request.POST.get('url')
#                 icon = request.FILES.get('icon')

#                 platform = PlatformLink(
#                     name=name,
#                     description=description,
#                     url=url,
#                     icon=icon
#                 )
#                 platform.save()
#                 return JsonResponse({"message": "Plateforme avec image enregistrée", "id": platform.id}, status=201)
#             except Exception as e:
#                 return JsonResponse({"error": str(e)}, status=400)

#         else:
#             return JsonResponse({"error": "Type de contenu non supporté"}, status=415)
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import PlatformLink
from .serializers import PlatformLinkSerializer

# GET (liste de tous les PlatformLink) et POST (création d'un nouveau)
@api_view(['GET', 'POST'])
@parser_classes([JSONParser, MultiPartParser, FormParser])
def platform_link_list_create_api(request):
    if request.method == 'GET':
        platforms = PlatformLink.objects.all()
        serializer = PlatformLinkSerializer(platforms, many=True, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PlatformLinkSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# GET (détail), PUT (mise à jour partielle/complète), DELETE (suppression) pour un PlatformLink donné
@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([JSONParser, MultiPartParser, FormParser])
def platform_link_detail_api(request, pk):
    try:
        platform = PlatformLink.objects.get(pk=pk)
    except PlatformLink.DoesNotExist:
        return Response({"error": "Plateforme non trouvée"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PlatformLinkSerializer(platform, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PlatformLinkSerializer(platform, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        platform.delete()
        return Response({"message": "Plateforme supprimée avec succès"}, status=status.HTTP_204_NO_CONTENT)





from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import MotPresident
from .serializers import MotPresidentSerializer

@api_view(['GET', 'POST'])
def mot_president_list_create(request):
    if request.method == 'GET':
        mots = MotPresident.objects.all()
        serializer = MotPresidentSerializer(mots, many=True, context={'request': request})
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = MotPresidentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def mot_president_detail(request, pk):
    try:
        mot = MotPresident.objects.get(pk=pk)
    except MotPresident.DoesNotExist:
        return Response({'error': 'Mot du président non trouvé.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MotPresidentSerializer(mot, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MotPresidentSerializer(mot, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        mot.delete()
        return Response({'message': 'Supprimé avec succès.'}, status=status.HTTP_204_NO_CONTENT)











# 






#Programs
# from django.views.decorators.csrf import csrf_exempt
# from django.http import JsonResponse
# from django.views.decorators.http import require_http_methods
# from .models import Programme

# @csrf_exempt
# @require_http_methods(["GET", "POST"])
# def programmes_api(request):
#     if request.method == "GET":
#         programmes = Programme.objects.all()
#         data = []

#         for programme in programmes:
#             data.append({
#                 "id": programme.id,
#                 "title": programme.title,
#                 "description": programme.description,
#                 "photo_couverture": request.build_absolute_uri(programme.photo_couverture.url),
#             })
#         return JsonResponse(data, safe=False)

#     elif request.method == "POST":
#         title = request.POST.get("title")
#         description = request.POST.get("description")
#         photo_couverture = request.FILES.get("photo_couverture")

#         if not (title and description and photo_couverture):
#             return JsonResponse({"error": "Tous les champs sont requis."}, status=400)

#         programme = Programme.objects.create(
#             title=title,
#             description=description,
#             photo_couverture=photo_couverture
#         )

#         return JsonResponse({
#             "message": "Programme ajouté avec succès.",
#             "programme": {
#                 "id": programme.id,
#                 "title": programme.title,
#                 "description": programme.description,
#                 "photo_couverture": request.build_absolute_uri(programme.photo_couverture.url),
#             }
#         }, status=201)



# views.py
# views.py
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import Programme
from .serializers import ProgrammeSerializer

@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser])
def programme_list_create(request):
    if request.method == 'GET':
        programmes = Programme.objects.all()
        serializer = ProgrammeSerializer(programmes, many=True, context={"request": request})
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProgrammeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser])
def programme_detail(request, pk):
    try:
        programme = Programme.objects.get(pk=pk)
    except Programme.DoesNotExist:
        return Response({'error': 'Programme non trouvé.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProgrammeSerializer(programme, context={"request": request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProgrammeSerializer(programme, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        programme.delete()
        return Response({'message': 'Programme supprimé avec succès.'}, status=status.HTTP_204_NO_CONTENT)






# #AddVideo

# from django.views.decorators.csrf import csrf_exempt
# from django.http import JsonResponse
# from django.views.decorators.http import require_http_methods
# from .models import Video

# @csrf_exempt
# @require_http_methods(["GET", "POST"])
# def add_video(request):
#     if request.method == "GET":
#         videos = Video.objects.all()
#         data = []
#         for video in videos:
#             data.append({
#                 "id": video.id,
#                 "titre": video.titre,
#                 "lien": video.lien,
#                 "couverture": request.build_absolute_uri(video.couverture.url)
#             })
#         return JsonResponse(data, safe=False)

#     if request.method == "POST":
#         titre = request.POST.get("titre")
#         lien = request.POST.get("lien")
#         couverture = request.FILES.get("couverture")

#         if not (titre and lien and couverture):
#             return JsonResponse({"error": "Tous les champs sont requis."}, status=400)

#         video = Video.objects.create(titre=titre, lien=lien, couverture=couverture)

#         return JsonResponse({
#             "message": "Vidéo ajoutée avec succès.",
#             "video": {
#                 "id": video.id,
#                 "titre": video.titre,
#                 "lien": video.lien,
#                 "couverture": request.build_absolute_uri(video.couverture.url)
#             }
#         }, status=201)




#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#addphoto

# # views.py
# from django.views.decorators.csrf import csrf_exempt
# from django.http import JsonResponse
# from django.views.decorators.http import require_http_methods
# from .models import MediaContent

# @csrf_exempt
# @require_http_methods(["POST", "GET"])
# def add_media_content(request):
#     if request.method == "GET":
#         contenus = MediaContent.objects.all()
#         data = []

#         for contenu in contenus:
#             data.append({
#                 "id": contenu.id,
#                 "titre": contenu.titre,
#                 "description": contenu.description,
#                 "image": request.build_absolute_uri(contenu.image.url)
#             })
#         return JsonResponse(data, safe=False)

#     elif request.method == "POST":
#         titre = request.POST.get("titre")
#         description = request.POST.get("description")
#         image = request.FILES.get("image")

#         if not (titre and description and image):
#             return JsonResponse({"error": "Tous les champs sont requis."}, status=400)

#         media = MediaContent.objects.create(titre=titre, description=description, image=image)

#         return JsonResponse({
#             "message": "Contenu ajouté avec succès.",
#             "media": {
#                 "id": media.id,
#                 "titre": media.titre,
#                 "description": media.description,
#                 "image": request.build_absolute_uri(media.image.url)
#             }
#         }, status=201)

#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#document


from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Document

@csrf_exempt
@require_http_methods(["POST", "GET"])
def document_api(request):
    if request.method == "GET":
        documents = Document.objects.all()
        data = []

        for doc in documents:
            data.append({
                "id": doc.id,
                "titre": doc.titre,
                "couverture": request.build_absolute_uri(doc.couverture.url),
                "fichier": request.build_absolute_uri(doc.fichier.url)
            })
        return JsonResponse(data, safe=False)

    elif request.method == "POST":
        titre = request.POST.get("titre")
        couverture = request.FILES.get("couverture")
        fichier = request.FILES.get("fichier")

        if not (titre and couverture and fichier):
            return JsonResponse({"error": "Tous les champs sont requis."}, status=400)

        doc = Document.objects.create(titre=titre, couverture=couverture, fichier=fichier)

        return JsonResponse({
            "message": "Document ajouté avec succès.",
            "document": {
                "id": doc.id,
                "titre": doc.titre,
                "couverture": request.build_absolute_uri(doc.couverture.url),
                "fichier": request.build_absolute_uri(doc.fichier.url)
            }
        }, status=201)


# #mediapartners

# from rest_framework import viewsets
# from .models import Partenaire
# from .serializers import PartenaireSerializer

# class PartenaireViewSet(viewsets.ModelViewSet):
#     queryset = Partenaire.objects.all().order_by('-id')
#     serializer_class = PartenaireSerializer









#API AGREG2

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny



# views.py
from itertools import chain
from operator import itemgetter
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Programme
from .serializers import FondationSerializer, ProgrammeSerializer, PlatformLinkSerializer


class AggregatedContentAPIView(APIView):
    def get(self, request):
        # Sérialiser chaque modèle
        blogs = BlogSerializer(Blog.objects.all(), many=True).data
        for item in blogs:
            item["type"] = "blog"

        fondations = FondationSerializer(Fondation.objects.all(), many=True).data
        for item in fondations:
            item["type"] = "fondation"


        programmes = ProgrammeSerializer(Programme.objects.all(), many=True).data
        for item in programmes:
            item["type"] = "programme"

        platforms = PlatformSerializer(Platform.objects.all(), many=True).data
        for item in platforms:
            item["type"] = "platform"

        # Fusionner les résultats dans une seule liste et trier par date
        all_items = list(chain(blogs, fondations, programmes, platforms))
        all_items_sorted = sorted(all_items, key=itemgetter('created_at'), reverse=True)

        return Response(all_items_sorted)




# views.py

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]  # Seulement les utilisateurs authentifiés peuvent accéder à cette vue

    def get(self, request):
        return Response({"message": "Vous avez accès à cette vue protégée !"})




# from rest_framework import viewsets
# from .models import Activity
# from .serializers import ActivitySerializer

# class ActivityViewSet(viewsets.ModelViewSet):
#     queryset = Activity.objects.all().order_by('-created_at')
#     serializer_class = ActivitySerializer
from rest_framework import viewsets
from .models import Activity
from .serializers import ActivitySerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all().order_by('-created_at')
    serializer_class = ActivitySerializer




from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import FondationTamkine
from .serializers import FondationTamkineSerializer

@api_view(['GET', 'POST'])
def fondation_list_create(request):
    if request.method == 'GET':
        # Récupérer toutes les fondations et les retourner
        fondations = FondationTamkine.objects.all()
        serializer = FondationTamkineSerializer(fondations, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Créer une nouvelle fondation
        serializer = FondationTamkineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def fondation_detail(request, pk):
    try:
        fondation = FondationTamkine.objects.get(pk=pk)
    except FondationTamkine.DoesNotExist:
        return Response({'error': 'Fondation not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Récupérer les détails d'une fondation
        serializer = FondationTamkineSerializer(fondation)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # Mettre à jour les informations d'une fondation
        serializer = FondationTamkineSerializer(fondation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Supprimer une fondation
        fondation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)





from django.http import HttpResponse

def home(request):
    return HttpResponse("Bienvenue sur JorfofVDjango !")

#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Photo
# from .serializers import PhotoSerializer

# @api_view(['GET', 'POST'])
# def photo_list(request):
#     if request.method == 'GET':
#         photos = Photo.objects.all().order_by('-created_at')
#         serializer = PhotoSerializer(photos, many=True, context={'request': request})
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = PhotoSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET', 'PUT', 'DELETE'])
# def photo_detail(request, pk):
#     try:
#         photo = Photo.objects.get(pk=pk)
#     except Photo.DoesNotExist:
#         return Response({'error': 'Photo non trouvée'}, status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = PhotoSerializer(photo, context={'request': request})
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = PhotoSerializer(photo, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         photo.delete()
#         return Response({'message': 'Photo supprimée avec succès'}, status=status.HTTP_204_NO_CONTENT)


# views.py
from rest_framework import viewsets
from .models import Album, Photo
from .serializers import AlbumSerializer, PhotoSerializer

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def perform_create(self, serializer):
        # Si le frontend envoie déjà un lien Cloudinary complet, on le garde
        image_url = self.request.data.get("image")
        serializer.save(image=image_url)


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

    def perform_create(self, serializer):
        image_url = self.request.data.get("image")
        serializer.save(image=image_url)




#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


from rest_framework import viewsets, filters, permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Video
from .serializers import VideoSerializer

class VideoViewSet(viewsets.ModelViewSet):
    """
    CRUD complet pour Video.
    - GET list / retrieve
    - POST create (supporte multipart/form-data pour cover_image)
    - PUT/PATCH update
    - DELETE destroy
    """
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]  # accepte upload fichiers + JSON
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title_fr", "title_en", "title_ar", "comment_fr", "comment_en"]
    ordering_fields = ["created_at", "title_fr"]

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
from rest_framework import viewsets, filters, permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import News
from .serializers import NewsSerializer

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]  # accepte upload image
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title_fr", "title_en", "title_ar", "content_fr", "content_en"]
    ordering_fields = ["created_at", "title_fr"]
#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
from rest_framework import viewsets, parsers
from .models import Match
from .serializers import MatchSerializer

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    # parser_classes = [parsers.MultiPartParser, parsers.FormParser]



#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# base/views.py
from rest_framework import viewsets
from .models import Partner
from .serializers import PartnerSerializer

class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all().order_by('-created_at')
    serializer_class = PartnerSerializer


#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


# base/views/mot_president_views.py (ou directement dans base/views.py si tu préfères)
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import MotPresident
from .serializers import MotPresidentSerializer

class MotPresidentViewSet(viewsets.ModelViewSet):
    """
    API CRUD pour le mot du président
    """
    queryset = MotPresident.objects.all().order_by('-created_at')
    serializer_class = MotPresidentSerializer
    permission_classes = [AllowAny]  # à sécuriser si besoin (IsAuthenticated)

    def create(self, request, *args, **kwargs):
        """
        Permet d’ajouter un mot du président (avec image Cloudinary)
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






















from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Valeur
from .serializers import ValeurSerializer


@api_view(['GET', 'POST'])
def valeurs_list(request):
    if request.method == 'GET':
        valeurs = Valeur.objects.all().order_by('-id')  # pour avoir les plus récentes en premier
        serializer = ValeurSerializer(valeurs, many=True, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ValeurSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def valeurs_detail(request, pk):
    try:
        valeur = Valeur.objects.get(pk=pk)
    except Valeur.DoesNotExist:
        return Response({"error": "Valeur non trouvée."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ValeurSerializer(valeur, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ValeurSerializer(valeur, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        valeur.delete()
        return Response({"message": "Valeur supprimée avec succès."}, status=status.HTTP_204_NO_CONTENT)


#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Mission
from .serializers import MissionSerializer

@api_view(['GET', 'POST'])
def mission_list_create(request):
    if request.method == 'GET':
        missions = Mission.objects.all()
        serializer = MissionSerializer(missions, many=True, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def mission_detail(request, pk):
    try:
        mission = Mission.objects.get(pk=pk)
    except Mission.DoesNotExist:
        return Response({'error': 'Mission non trouvée.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MissionSerializer(mission, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MissionSerializer(mission, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        mission.delete()
        return Response({'message': 'Supprimée avec succès.'}, status=status.HTTP_204_NO_CONTENT)

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
from rest_framework import viewsets, filters
from rest_framework.pagination import PageNumberPagination
from .models import EquipeMember
from .serializers import EquipeMemberSerializer


# 🎛️ Pagination personnalisée
class EquipePagination(PageNumberPagination):
    page_size = 6  # nombre d’éléments par page
    page_size_query_param = 'page_size'
    max_page_size = 30


# 🎯 Vue API principale
class EquipeMemberViewSet(viewsets.ModelViewSet):
    queryset = EquipeMember.objects.all().order_by('role', 'last_name')
    serializer_class = EquipeMemberSerializer
    pagination_class = EquipePagination

    # 🔍 Ajoute filtres, recherche et tri
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name', 'last_name', 'nationality', 'role']
    ordering_fields = ['last_name', 'created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        role = self.request.query_params.get('role')
        if role:
            queryset = queryset.filter(role=role)
        return queryset


from django_filters.rest_framework import DjangoFilterBackend

filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
filterset_fields = ['role', 'nationality']


#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from rest_framework import generics, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Contact
from .serializers import ContactSerializer


class ContactListCreateView(generics.ListCreateAPIView):
    queryset = Contact.objects.all().order_by('-created_at')
    serializer_class = ContactSerializer

    def perform_create(self, serializer):
        contact = serializer.save()

        # 📨 Email de confirmation à l’utilisateur
        subject_user = f"Confirmation de votre message - {contact.subject}"
        message_user = (
            f"Bonjour {contact.name},\n\n"
            f"Merci de nous avoir contactés via le site Jorfof Basket Club.\n"
            f"Nous avons bien reçu votre message :\n\n"
            f"---\n"
            f"{contact.message}\n"
            f"---\n\n"
            f"Notre équipe vous répondra dès que possible.\n\n"
            f"Cordialement,\n"
            f"L’équipe Jorfof Basket Club"
        )

        send_mail(
            subject_user,
            message_user,
            settings.DEFAULT_FROM_EMAIL,
            [contact.email],
            fail_silently=True,
        )

        # 📩 Notification à l’administrateur
        subject_admin = f"Nouveau message de contact : {contact.subject}"
        message_admin = (
            f"Nom : {contact.name}\n"
            f"Email : {contact.email}\n"
            f"Catégorie : {contact.get_category_display()}\n\n"
            f"Message :\n{contact.message}"
        )

        send_mail(
            subject_admin,
            message_admin,
            settings.DEFAULT_FROM_EMAIL,
            [settings.CONTACT_ADMIN_EMAIL],
            fail_silently=True,
        )


class ContactDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


from rest_framework.views import APIView

class ContactReplyView(APIView):
    def post(self, request, pk):
        try:
            contact = Contact.objects.get(pk=pk)
        except Contact.DoesNotExist:
            return Response({'error': 'Contact introuvable'}, status=status.HTTP_404_NOT_FOUND)

        reply_message = request.data.get('reply', '').strip()
        if not reply_message:
            return Response({'error': 'Le message de réponse est vide'}, status=status.HTTP_400_BAD_REQUEST)

        # ✉️ Envoi de la réponse à l'utilisateur
        send_mail(
            subject=f"Réponse à votre message - {contact.subject}",
            message=f"Bonjour {contact.name},\n\n{reply_message}\n\nCordialement,\nL’équipe Jorfof Basket Club",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[contact.email],
            fail_silently=False,
        )

        return Response({'success': 'Email envoyé avec succès'}, status=status.HTTP_200_OK)
#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
from .models import Community
from .serializers import CommunitySerializer


# 🔹 Liste + Création des membres de la communauté
class CommunityListCreateView(generics.ListCreateAPIView):
    queryset = Community.objects.all().order_by('-created_at')
    serializer_class = CommunitySerializer

    def perform_create(self, serializer):
        community = serializer.save()

        # 📨 Email de confirmation personnalisé selon le rôle
        greetings = f"Bonjour {community.name},\n\n"
        base_message = (
            "Merci de rejoindre la communauté du Jorfof Basket Club !\n"
            "Nous avons bien enregistré votre inscription en tant que "
            f"{community.get_role_display()}.\n\n"
        )

        # Message selon le rôle
        if community.role == "benevole":
            role_message = "Nous vous contacterons prochainement pour participer à nos événements."
        elif community.role == "entraineur":
            role_message = "Notre équipe technique prendra contact avec vous pour une éventuelle collaboration."
        elif community.role == "joueur":
            role_message = "Nous vous informerons des prochaines sélections et opportunités sportives."
        elif community.role == "supporter":
            role_message = "Merci de votre soutien ! Vous serez tenu informé des actualités du club."
        else:
            role_message = "Merci de votre intérêt pour le Jorfof Basket Club."

        footer = "\n\nCordialement,\nL’équipe Jorfof Basket Club"

        message_user = greetings + base_message + role_message + footer

        send_mail(
            subject="Bienvenue dans la communauté Jorfof Basket Club",
            message=message_user,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[community.email],
            fail_silently=True,
        )

        # 📩 Notification à l’administrateur
        subject_admin = f"Nouvelle inscription à la communauté : {community.name}"
        message_admin = (
            f"Nom : {community.name}\n"
            f"Email : {community.email}\n"
            f"Rôle : {community.get_role_display()}\n"
            f"Message : {community.message or '—'}\n"
        )

        send_mail(
            subject_admin,
            message_admin,
            settings.DEFAULT_FROM_EMAIL,
            [settings.CONTACT_ADMIN_EMAIL],
            fail_silently=True,
        )


# 🔹 Détail, modification, suppression
class CommunityDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer


# 🔹 Envoi d’une réponse manuelle (comme ContactReplyView)
class CommunityReplyView(APIView):
    def post(self, request, pk):
        try:
            community = Community.objects.get(pk=pk)
        except Community.DoesNotExist:
            return Response({'error': 'Membre introuvable'}, status=status.HTTP_404_NOT_FOUND)

        reply_message = request.data.get('reply', '').strip()
        if not reply_message:
            return Response({'error': 'Le message de réponse est vide'}, status=status.HTTP_400_BAD_REQUEST)

        # ✉️ Envoi de la réponse à l’utilisateur
        send_mail(
            subject="Réponse de l’équipe Jorfof Basket Club",
            message=f"Bonjour {community.name},\n\n{reply_message}\n\nCordialement,\nL’équipe Jorfof Basket Club",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[community.email],
            fail_silently=False,
        )

        community.is_replied = True
        community.save()

        return Response({'success': 'Email envoyé avec succès'}, status=status.HTTP_200_OK)


#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

from rest_framework import generics
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.views import APIView
from .models import Newsletter
from .serializers import NewsletterSerializer


# ✅ Liste + Création d'abonnés (un seul endpoint)
class NewsletterListCreateView(generics.ListCreateAPIView):
    queryset = Newsletter.objects.all().order_by('-created_at')
    serializer_class = NewsletterSerializer

    def perform_create(self, serializer):
        instance = serializer.save()

        # Envoi du mail au client
        send_mail(
            "Confirmation d’inscription à la Newsletter - Jorfof Club",
            "Merci de vous être inscrit à notre newsletter ! Vous recevrez nos actualités bientôt.",
            settings.EMAIL_HOST_USER,
            [instance.email],
            fail_silently=False,
        )

        # Envoi d’un mail à l’admin
        send_mail(
            "Nouvelle inscription à la newsletter",
            f"Nouvel abonné : {instance.email}",
            settings.EMAIL_HOST_USER,
            [settings.EMAIL_HOST_USER],
            fail_silently=False,
        )


# ✅ Détails, modification, suppression
class NewsletterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer


# ✅ Répondre à un abonné
class NewsletterReplyView(APIView):
    def post(self, request, pk):
        try:
            subscriber = Newsletter.objects.get(pk=pk)
        except Newsletter.DoesNotExist:
            return Response({"error": "Abonné introuvable"}, status=404)

        message = request.data.get("message", "")
        if not message:
            return Response({"error": "Le message est requis"}, status=400)

        send_mail(
            "Réponse de Jorfof Club",
            message,
            settings.EMAIL_HOST_USER,
            [subscriber.email],
            fail_silently=False,
        )

        subscriber.is_replied = True
        subscriber.save()
        return Response({"success": "Message envoyé avec succès"})
#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
from rest_framework import viewsets
from .models import Home
from .serializers import HomeSerializer

class HomeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Home.objects.all().order_by('-created_at')
    serializer_class = HomeSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

