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



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MotPresi
from .serializers import MotPresiSerializer

class MotPresiView(APIView):
    # Méthode GET : Récupère le premier mot du président
    def get(self, request):
        mot_presi = MotPresi.objects.all().first()  # On prend le premier mot du président
        serializer = MotPresiSerializer(mot_presi)

        # Ajout du chemin complet pour l'image
        if mot_presi.image:  # Vérifie si une image est associée
            mot_presi.image = request.build_absolute_uri(mot_presi.image.url)

        return Response(serializer.data)

    # Méthode POST : Crée un nouveau mot du président
    def post(self, request):
        # Sérialiser les données de la requête
        serializer = MotPresiSerializer(data=request.data)

        # Si les données sont valides, on crée un nouvel article
        if serializer.is_valid():
            serializer.save()  # Sauvegarde du nouvel objet dans la base de données
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # Si les données sont invalides, on renvoie une erreur
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#newsletter_subscription
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.mail import EmailMessage
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from .models import Subscriber  # Importer ton modèle d'abonnés

@csrf_exempt  # Si tu utilises la protection CSRF dans le frontend
def newsletter_subscription(request):
    if request.method == "POST":
        try:
            # Récupérer les données de la requête
            data = json.loads(request.body)
            email = data.get("email")
            
            if not email:
                return JsonResponse({"message": "Email est requis."}, status=400)

            # Enregistrer l'email dans la base de données
            subscriber = Subscriber.objects.create(email=email)

            # Envoyer un email de bienvenue
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







from rest_framework import viewsets
from .models import TeamMessage
from .serializers import TeamMessageSerializer

class TeamMessageViewSet(viewsets.ModelViewSet):
    queryset = TeamMessage.objects.all()
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
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import PlatformLink
import json

@csrf_exempt
def platform_links_api(request):
    if request.method == 'GET':
        platforms = PlatformLink.objects.all().values('id', 'name', 'description', 'url')
        return JsonResponse(list(platforms), safe=False)

    if request.method == 'POST':
        try:
            # Vérifiez si l'image a été envoyée via le formulaire
            name = request.POST.get('name')
            description = request.POST.get('description', '')
            url = request.POST.get('url')
            icon = request.FILES.get('icon')  # Récupère le fichier téléchargé

            if not name or not url:
                return JsonResponse({"error": "Le nom et l'URL sont requis."}, status=400)

            # Créez l'instance PlatformLink avec l'icône si elle est présente
            platform = PlatformLink.objects.create(name=name, description=description, url=url, icon=icon)
            
            return JsonResponse({
                "message": "Plateforme enregistrée avec succès.",
                "platform": {
                    "id": platform.id,
                    "name": platform.name,
                    "description": platform.description,
                    "url": platform.url,
                    "icon": platform.icon.url if platform.icon else None,
                }
            }, status=201)
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Méthode non autorisée."}, status=405)



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
from .models import Program
import json

@csrf_exempt
def programs_api(request):
    if request.method == 'GET':
        programs = Program.objects.all().values('id', 'title', 'description')
        return JsonResponse(list(programs), safe=False)

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            title = data.get('title')
            description = data.get('description', '')

            if not title:
                return JsonResponse({"error": "Le titre est requis."}, status=400)

            program = Program.objects.create(title=title, description=description)

            return JsonResponse({
                "message": "Programme enregistré avec succès.",
                "program": {
                    "id": program.id,
                    "title": program.title,
                    "description": program.description,
                }
            }, status=201)
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Méthode non autorisée."}, status=405)
