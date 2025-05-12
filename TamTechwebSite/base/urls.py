from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BlogViewSet, get_todos, CustomTokenObtainPairView, CustomTokenRefreshView,
    logout, register, is_logged_in, chatbot, ContactAPIView,
    newsletter_subscription, TeamMessageViewSet,
    get_last_two_missions, create_mission, PlatformViewSet, RejoindreAPIView, CommunityView,
    PartnerAPIView, platform_links_api, valeurs_api, fondations_api, mot_president_api,
    add_video, add_media_content, document_api, partenaire_api, programmes_api, AggregatedContentAPIView,
    ProtectedView, logout, newsletter_subscription, ActivityViewSet  # 👈 ajoute ces deux-là ici
)

# Définir le routeur
router = DefaultRouter()
router.register(r"blog", BlogViewSet)
router.register(r"team-messages", TeamMessageViewSet, basename='team-messages')
router.register(r'platforms', PlatformViewSet)
router.register(r'activities', ActivityViewSet, basename='activity')
# URL Patterns
urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', logout),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('todos/', get_todos),
    path('register/', register),
    path('authenticated/', is_logged_in),
    path('chatbot/', chatbot, name='chatbot'),
    path('contact/', ContactAPIView.as_view(), name='contact'),
    # Route pour DELETE (supprimer un contact) avec un id
    path('contact/<int:id>/', ContactAPIView.as_view(), name='contact-detail'),
    path('newsletter/', newsletter_subscription, name='newsletter_subscription'),
    path('missions/', get_last_two_missions, name='get_last_two_missions'),
    path('missions/create/', create_mission, name='create_mission'),
    path('rejoindre/', RejoindreAPIView.as_view(), name='rejoindre'),
    path('rejoindre/<int:id>/', RejoindreAPIView.as_view(), name='rejoindre-delete'),
    path('community/', CommunityView.as_view(), name='community'),
    # Route pour DELETE (supprimer un contact) avec un id
    path('community/<int:id>/', CommunityView.as_view()),
    path('partners/', PartnerAPIView.as_view(), name='partners'),
    path('platforms/', platform_links_api, name='platform_links_api'),
    path('valeurs/', valeurs_api, name='valeurs_api'),
    path('fondations/', fondations_api, name='fondations_api'),
    path('mot-president/', mot_president_api, name='mot_president_api'),
    path('add-video/', add_video, name='add_video'),
    path('media/', add_media_content, name='add_media_content'),
    path('documents/', document_api, name='document_api'),
    path('partenaires/', partenaire_api, name='partenaire_api'),
    path('programmes/', programmes_api, name='programmes_api'),
    path('aggregated-content/', AggregatedContentAPIView.as_view(), name='aggregated_content'),
    path('protected/', ProtectedView.as_view(), name='protected_view'),
    path('logout/', logout, name='logout'),
    

    path("", include(router.urls)),
]
