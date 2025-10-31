from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import (
    CustomTokenObtainPairView, CustomTokenRefreshView,
    logout, register, is_logged_in, chatbot, ContactAPIView,
    newsletter_subscription, TeamMessageViewSet,
    RejoindreAPIView, CommunityView,
    document_api, AggregatedContentAPIView,
    ProtectedView, logout, newsletter_subscription, ActivityViewSet, fondation_list_create, fondation_detail,
    VideoViewSet, NewsViewSet, MatchViewSet, PartnerViewSet
    # 👈 ajoute ces deux-là ici
)

# Définir le routeur
router = DefaultRouter()
router.register(r"team-messages", TeamMessageViewSet, basename='team-messages')
# router.register(r'platforms', PlatformViewSet)
router.register(r'activities', ActivityViewSet, basename='activity')
# router.register(r'partenaires', PartenaireViewSet, basename='partenaire')
#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.register(r'videos', VideoViewSet, basename='video')
router.register(r"news", NewsViewSet, basename="news")
router.register(r'matches', MatchViewSet, basename='match')
router.register(r'partners', PartnerViewSet, basename='partner')




# URL Patterns
urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', logout),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register),
    path('authenticated/', is_logged_in),
    path('chatbot/', chatbot, name='chatbot'),
    path('contact/', ContactAPIView.as_view(), name='contact'),
    # Route pour DELETE (supprimer un contact) avec un id
    path('contact/<int:id>/', ContactAPIView.as_view(), name='contact-detail'),
    path('newsletter/', newsletter_subscription, name='newsletter_subscription'),
    # path('missions/', get_last_two_missions, name='get_last_two_missions'),
    # path('missions/create/', create_mission, name='create_mission'),
    path('missions/', views.mission_list_create, name='mission_list_create'),
    path('missions/<int:pk>/', views.mission_detail, name='mission_detail'),
    path('rejoindre/', RejoindreAPIView.as_view(), name='rejoindre'),
    path('rejoindre/<int:id>/', RejoindreAPIView.as_view(), name='rejoindre-delete'),
    path('community/', CommunityView.as_view(), name='community'),
    # Route pour DELETE (supprimer un contact) avec un id
    path('community/<int:id>/', CommunityView.as_view()),
    # path('partners/', PartnerAPIView.as_view(), name='partners'),
    # path('platforms/', platform_links_api, name='platform_links_api'),
    
    # path('valeurs/', valeurs_api, name='valeurs_api'),
    # path('valeurs/', views.valeurs_api, name='valeurs_api'),
    # path('valeurs/<int:id>/', views.valeurs_detail, name='valeurs_detail'),
    path('valeurs/', views.valeurs_list, name='valeurs_list'),
    path('valeurs/<int:id>/', views.valeurs_detail, name='valeurs_detail'),
    # path('fondations/', fondations_api, name='fondations_api'),
    path('fondationtamkine/', fondation_list_create, name='fondation-list-create'),
    path('fondationtamkine/<int:pk>/', fondation_detail, name='fondation-detail'),
    path('documents/', document_api, name='document_api'),
    path('aggregated-content/', AggregatedContentAPIView.as_view(), name='aggregated_content'),
    path('protected/', ProtectedView.as_view(), name='protected_view'),
    path('logout/', logout, name='logout'),
    #/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    path('albums/', views.album_list, name='album_list'),
    path('albums/<int:pk>/', views.album_detail, name='album_detail'),
    path('media/', views.photo_list, name='photo_list'),
    path('media/<int:pk>/', views.photo_detail, name='photo_detail'),
 
    

    path("", include(router.urls)),
]
