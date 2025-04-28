from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated

# Create your views here.

from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from .models import Blog
from .serializers import BlogSerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]  # Permet à tout le monde d'accéder


from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken

from .models import Todo
from .serializers import TodoSerializer, UserRegisterSerializer, UserSerializer

from datetime import datetime, timedelta


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.error)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            seriliazer = UserSerializer(request.user, many=False)

            res = Response()

            res.data = {'success':True}

            res.set_cookie(
                key='access_token',
                value=str(access_token),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.set_cookie(
                key='refresh_token',
                value=str(refresh_token),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            res.data.update(tokens)
            return res
        
        except Exception as e:
            print(e)
            return Response({'success':False})
        
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):

    try:

        res = Response()
        res.data = {'success':True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('response_token', path='/', samesite='None')

        return res

    except Exception as e:
        print(e)
        return Response({'success':False})

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





#newsletter_subscription
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.mail import EmailMessage
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from django.conf import settings  # il manquait aussi cette importation
from .models import Subscriber

@csrf_exempt
def newsletter_subscription(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")

            if not email:
                return JsonResponse({"message": "Email est requis."}, status=400)

            # Vérifier si l'email existe déjà
            if Subscriber.objects.filter(email=email).exists():
                return JsonResponse({"message": "Cet email est déjà abonné."}, status=400)

            # Enregistrer l'email
            subscriber = Subscriber.objects.create(email=email)

            # Envoyer l'email de bienvenue
            html_message = render_to_string('emails/abonnement_email.html')
            plain_message = strip_tags(html_message)
            subject = "Welcome to subscription"
            email_message = EmailMessage(
                subject=subject,
                body=html_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[email],
                reply_to=[settings.DEFAULT_FROM_EMAIL],
            )
            email_message.content_subtype = "html"
            email_message.send()

            return JsonResponse({"message": "Merci pour votre abonnement !"}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Erreur de décodage JSON."}, status=400)

    return JsonResponse({"message": "Méthode non autorisée."}, status=405)




from django.http import JsonResponse
from .models import Subscriber

def get_subscribers(request):
    if request.method == "GET":
        # Récupérer tous les abonnés
        subscribers = Subscriber.objects.all()
        # Créer une liste d'emails
        subscriber_list = [{"email": subscriber.email} for subscriber in subscribers]
        return JsonResponse(subscriber_list, safe=False)
    return JsonResponse({"message": "Méthode non autorisée."}, status=405)






#Mot d'équipe
from rest_framework import viewsets
from .models import TeamMessage
from .serializers import TeamMessageSerializer

class TeamMessageViewSet(viewsets.ModelViewSet):
    queryset = TeamMessage.objects.all().order_by('-created_at')  # on trie du plus récent au plus ancien
    serializer_class = TeamMessageSerializer



# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Mission
from .serializers import MissionSerializer

@api_view(['GET'])
def get_last_two_missions(request):
    missions = Mission.objects.order_by('-created_at')[:2]
    serializer = MissionSerializer(missions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_mission(request):
    serializer = MissionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# views.py

from rest_framework import viewsets
from .models import Platform
from .serializers import PlatformSerializer

class PlatformViewSet(viewsets.ModelViewSet):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer



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



# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CommunityContact
from .serializers import CommunityContactSerializer
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings



#ComminityContact
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CommunityContact
from .serializers import CommunityContactSerializer
from django.conf import settings

class CommunityView(APIView):
    def get(self, request):
        contacts = CommunityContact.objects.all().order_by('-created_at')
        serializer = CommunityContactSerializer(contacts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CommunityContactSerializer(data=request.data)

        if serializer.is_valid():
            # Sauvegarde dans la base de données
            community_contact = serializer.save()

            # Récupérer les informations nécessaires
            nom = community_contact.nom
            email = community_contact.email
            organisation = "Tamkine Foundation"  # Nom de ton organisation
            message = "Merci d'avoir soumis votre demande d'adhésion. Vous serez bientôt contacté."

            # Envoi de l'email à la personne ayant postulé
            html_user = render_to_string('emails/community_email.html', {
                'nom': nom,
                'organisation': organisation,
                'message': message,
            })
            email_user = EmailMessage(
                subject=f"Confirmation d'adhésion - {organisation}",
                body=html_user,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[email]
            )
            email_user.content_subtype = "html"
            email_user.send()

            # Envoi de l'email à l'admin
            html_admin = render_to_string('emails/rejoindre_admin.html', {
                'nom': nom,
                'email': email,
                'message': message,
                'organisation': organisation,
            })
            email_admin = EmailMessage(
                subject=f"Nouvelle demande de contact - {organisation}",
                body=html_admin,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=['tonemail@admin.com'],  # Remplacer par l'email de l'admin
                reply_to=[email]
            )
            email_admin.content_subtype = "html"
            email_admin.send()

            return Response({'message': 'Votre demande a été envoyée avec succès !'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




#ComminityPartner
# partners/views.py
from django.core.mail import send_mail
from django.template.loader import render_to_string
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Partner
from .serializers import PartnerSerializer
from django.conf import settings

class PartnerAPIView(APIView):
    # GET : Affiche tous les partenaires
    def get(self, request):
        partners = Partner.objects.all().order_by('-created_at')  # Les plus récents d'abord
        serializer = PartnerSerializer(partners, many=True)
        return Response(serializer.data)

    # POST : Permet d'ajouter un partenaire et d'envoyer un email
    def post(self, request, *args, **kwargs):
        serializer = PartnerSerializer(data=request.data)
        if serializer.is_valid():
            partner = serializer.save()

            # ==== Envoi d'un email à l'administrateur ====
            html_admin_message = render_to_string('emails/partner_admin.html', {
                'partner': partner,
            })
            email_admin = send_mail(
                subject=f"Nouveau partenaire enregistré: {partner.first_name} {partner.last_name}",
                message=html_admin_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=['admin@example.com'],  # Remplace par l'email de l'admin
                html_message=html_admin_message,
            )

            # ==== Envoi d'un email de confirmation à l'utilisateur ====
            html_user_message = render_to_string('emails/partner_admin.html', {'partner': partner})
            email_user = send_mail(
                subject="Confirmation de votre inscription",
                message=html_user_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[partner.email],
                html_message=html_user_message,
            )

            return Response({'message': 'Partenaire ajouté et confirmation envoyée.'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#PlateformeLink
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.dateparse import parse_datetime
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.views.decorators.http import require_http_methods
import json

from .models import PlatformLink

@csrf_exempt
@require_http_methods(["GET", "POST"])
def platform_links_api(request):
    if request.method == "GET":
        platforms = PlatformLink.objects.all()
        data = []
        for platform in platforms:
            data.append({
                "id": platform.id,
                "name": platform.name,
                "description": platform.description,
                "url": platform.url,
                "icon": platform.icon.url if platform.icon else None,
                "added_at": platform.added_at,
            })
        return JsonResponse(data, safe=False)

    elif request.method == "POST":
        if request.content_type == 'application/json':
            try:
                body = json.loads(request.body.decode('utf-8'))
                name = body.get('name')
                description = body.get('description')
                url = body.get('url')
                added_at = parse_datetime(body.get('added_at')) if body.get('added_at') else None

                platform = PlatformLink(
                    name=name,
                    description=description,
                    url=url,
                    added_at=added_at
                )
                platform.save()
                return JsonResponse({"message": "Plateforme créée avec succès", "id": platform.id}, status=201)
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=400)
        
        elif request.FILES:
            try:
                name = request.POST.get('name')
                description = request.POST.get('description')
                url = request.POST.get('url')
                icon = request.FILES.get('icon')

                platform = PlatformLink(
                    name=name,
                    description=description,
                    url=url,
                    icon=icon
                )
                platform.save()
                return JsonResponse({"message": "Plateforme avec image enregistrée", "id": platform.id}, status=201)
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=400)

        else:
            return JsonResponse({"error": "Type de contenu non supporté"}, status=415)



#MotDuPresident
# views.py
from .models import MotPresident
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

@csrf_exempt
@require_http_methods(["GET", "POST"])
def mot_president_api(request):
    if request.method == "GET":
        mots = MotPresident.objects.all()
        data = []
        for mot in mots:
            data.append({
                "id": mot.id,
                "titre": mot.titre,
                "description": mot.description,
                "image": request.build_absolute_uri(mot.image.url)
            })
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        titre = request.POST.get("titre")
        description = request.POST.get("description")
        image = request.FILES.get("image")

        if not (titre and description and image):
            return JsonResponse({"error": "Tous les champs sont requis."}, status=400)

        mot = MotPresident.objects.create(titre=titre, description=description, image=image)
        
        return JsonResponse({
            "message": "Mot du président ajouté avec succès.",
            "motPresident": {
                "id": mot.id,
                "titre": mot.titre,
                "description": mot.description,
                "image": request.build_absolute_uri(mot.image.url)
            }
        }, status=201)






#Fondation Tamkine
# views.py
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Fondation

@csrf_exempt
@require_http_methods(["GET", "POST"])
def fondations_api(request):
    if request.method == "GET":
        fondations = Fondation.objects.all()
        data = []
        for f in fondations:
            data.append({
                "id": f.id,
                "titre": f.titre,
                "description": f.description,
                "image": request.build_absolute_uri(f.image.url)
            })
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        titre = request.POST.get("titre")
        description = request.POST.get("description")
        image = request.FILES.get("image")

        if not (titre and description and image):
            return JsonResponse({"error": "Tous les champs sont requis."}, status=400)

        fondation = Fondation.objects.create(titre=titre, description=description, image=image)

        return JsonResponse({
            "message": "Fondation ajoutée avec succès.",
            "fondation": {
                "id": fondation.id,
                "titre": fondation.titre,
                "description": fondation.description,
                "image": request.build_absolute_uri(fondation.image.url)
            }
        }, status=201)





#Valeurs
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Valeur
from django.core.files.storage import default_storage

@csrf_exempt
@require_http_methods(["GET", "POST"])
def valeurs_api(request):
    if request.method == "GET":
        # Récupérer toutes les valeurs avec leurs informations
        valeurs = Valeur.objects.all()
        
        # Convertir les objets en dictionnaires
        data = []
        for valeur in valeurs:
            data.append({
                "id": valeur.id,
                "titre": valeur.titre,
                "description": valeur.description,
                "image": request.build_absolute_uri(valeur.image.url)

            })

        return JsonResponse(data, safe=False)

    if request.method == "POST":
        titre = request.POST.get("titre")
        description = request.POST.get("description")
        image = request.FILES.get("image")

        if not (titre and description and image):
            return JsonResponse({"error": "Tous les champs sont requis."}, status=400)

        # Créer une nouvelle instance de Valeur avec l'image
        valeur = Valeur.objects.create(titre=titre, description=description, image=image)

        # Retourner une réponse JSON avec l'URL complète de l'image
        return JsonResponse({
            "message": "Valeur ajoutée avec succès.",
            "valeur": {
                "id": valeur.id,
                "titre": valeur.titre,
                "description": valeur.description,
                "image": request.build_absolute_uri(valeur.image.url)  # Assure l'URL absolue de l'image
            }
        }, status=201)



#Programs
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Programme

@csrf_exempt
@require_http_methods(["GET", "POST"])
def programmes_api(request):
    if request.method == "GET":
        programmes = Programme.objects.all()
        data = []

        for programme in programmes:
            data.append({
                "id": programme.id,
                "title": programme.title,
                "description": programme.description,
                "photo_couverture": request.build_absolute_uri(programme.photo_couverture.url),
            })
        return JsonResponse(data, safe=False)

    elif request.method == "POST":
        title = request.POST.get("title")
        description = request.POST.get("description")
        photo_couverture = request.FILES.get("photo_couverture")

        if not (title and description and photo_couverture):
            return JsonResponse({"error": "Tous les champs sont requis."}, status=400)

        programme = Programme.objects.create(
            title=title,
            description=description,
            photo_couverture=photo_couverture
        )

        return JsonResponse({
            "message": "Programme ajouté avec succès.",
            "programme": {
                "id": programme.id,
                "title": programme.title,
                "description": programme.description,
                "photo_couverture": request.build_absolute_uri(programme.photo_couverture.url),
            }
        }, status=201)


#AddVideo

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Video

@csrf_exempt
@require_http_methods(["GET", "POST"])
def add_video(request):
    if request.method == "GET":
        videos = Video.objects.all()
        data = []
        for video in videos:
            data.append({
                "id": video.id,
                "titre": video.titre,
                "lien": video.lien,
                "couverture": request.build_absolute_uri(video.couverture.url)
            })
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        titre = request.POST.get("titre")
        lien = request.POST.get("lien")
        couverture = request.FILES.get("couverture")

        if not (titre and lien and couverture):
            return JsonResponse({"error": "Tous les champs sont requis."}, status=400)

        video = Video.objects.create(titre=titre, lien=lien, couverture=couverture)

        return JsonResponse({
            "message": "Vidéo ajoutée avec succès.",
            "video": {
                "id": video.id,
                "titre": video.titre,
                "lien": video.lien,
                "couverture": request.build_absolute_uri(video.couverture.url)
            }
        }, status=201)





#addphoto

# views.py
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import MediaContent

@csrf_exempt
@require_http_methods(["POST", "GET"])
def add_media_content(request):
    if request.method == "GET":
        contenus = MediaContent.objects.all()
        data = []

        for contenu in contenus:
            data.append({
                "id": contenu.id,
                "titre": contenu.titre,
                "description": contenu.description,
                "image": request.build_absolute_uri(contenu.image.url)
            })
        return JsonResponse(data, safe=False)

    elif request.method == "POST":
        titre = request.POST.get("titre")
        description = request.POST.get("description")
        image = request.FILES.get("image")

        if not (titre and description and image):
            return JsonResponse({"error": "Tous les champs sont requis."}, status=400)

        media = MediaContent.objects.create(titre=titre, description=description, image=image)

        return JsonResponse({
            "message": "Contenu ajouté avec succès.",
            "media": {
                "id": media.id,
                "titre": media.titre,
                "description": media.description,
                "image": request.build_absolute_uri(media.image.url)
            }
        }, status=201)


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


#mediapartners

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Partenaire

@csrf_exempt
@require_http_methods(["POST", "GET"])
def partenaire_api(request):
    if request.method == "GET":
        partenaires = Partenaire.objects.all()
        data = []

        for partenaire in partenaires:
            data.append({
                "id": partenaire.id,
                "titre": partenaire.titre,
                "description": partenaire.description,
                "couverture": request.build_absolute_uri(partenaire.couverture.url),
                "site_url": partenaire.site_url
            })
        return JsonResponse(data, safe=False)

    elif request.method == "POST":
        titre = request.POST.get("titre")
        description = request.POST.get("description")
        couverture = request.FILES.get("couverture")
        site_url = request.POST.get("site_url")

        if not (titre and description and couverture and site_url):
            return JsonResponse({"error": "Tous les champs sont requis."}, status=400)

        partenaire = Partenaire.objects.create(
            titre=titre,
            description=description,
            couverture=couverture,
            site_url=site_url
        )

        return JsonResponse({
            "message": "Partenaire ajouté avec succès.",
            "partenaire": {
                "id": partenaire.id,
                "titre": partenaire.titre,
                "description": partenaire.description,
                "couverture": request.build_absolute_uri(partenaire.couverture.url),
                "site_url": partenaire.site_url
            }
        }, status=201)




#API AGREG2

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Blog, Fondation, Video, Programme, Platform
from .serializers import BlogSerializer, FondationSerializer, VideoSerializer, ProgrammeSerializer, PlatformSerializer

class AggregatedContentAPIView(APIView):

    def get(self, request):
        blogs = Blog.objects.all()
        fondations = Fondation.objects.all()
        videos = Video.objects.all()
        programmes = Programme.objects.all()
        platforms = Platform.objects.all()

        data = {
            "blogs": BlogSerializer(blogs, many=True).data,
            "fondations": FondationSerializer(fondations, many=True).data,
            "videos": VideoSerializer(videos, many=True).data,
            "programmes": ProgrammeSerializer(programmes, many=True).data,
            "platforms": PlatformSerializer(platforms, many=True).data,
        }
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Tu dois préciser dans le body 'type' pour savoir où poster (ex: 'blog', 'fondation', etc)
        """
        content_type = request.data.get('type')

        if content_type == "blog":
            serializer = BlogSerializer(data=request.data)
        elif content_type == "fondation":
            serializer = FondationSerializer(data=request.data)
        elif content_type == "video":
            serializer = VideoSerializer(data=request.data)
        elif content_type == "programme":
            serializer = ProgrammeSerializer(data=request.data)
        elif content_type == "platform":
            serializer = PlatformSerializer(data=request.data)
        else:
            return Response({"error": "Type invalide ou manquant."}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
