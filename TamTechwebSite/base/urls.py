from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BlogViewSet, get_todos, CustomTokenObtainPairView, CustomTokenRefreshView,
    logout, register, is_logged_in, chatbot, ContactAPIView, MotPresiView,
    newsletter_subscription, TeamMessageViewSet,
    get_last_two_missions, create_mission, PlatformViewSet, RejoindreAPIView, CommunityView,
    PartnerAPIView, get_subscribers, platform_links_api, valeurs_api, programs_api  # 👈 ajoute ces deux-là ici
)

# Définir le routeur
router = DefaultRouter()
router.register(r"blog", BlogViewSet)
router.register(r"team-message", TeamMessageViewSet, basename='team-message')
router.register(r'platforms', PlatformViewSet)

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
    path('motpresi/', MotPresiView.as_view(), name='motpresi-view'),
    path('newsletter/', newsletter_subscription, name='newsletter_subscription'),
    path('newsletter/subscribers/', get_subscribers, name='get_subscribers'),
    path('missions/', get_last_two_missions, name='get_last_two_missions'),
    path('missions/create/', create_mission, name='create_mission'),
    path('rejoindre/', RejoindreAPIView.as_view(), name='rejoindre'),
    path('community/', CommunityView.as_view(), name='community'),
    path('partners/', PartnerAPIView.as_view(), name='partners'),
    path('platforms/', platform_links_api, name='platform_links_api'),
    path('valeurs/', valeurs_api, name='valeurs_api'),
    path('programs/', programs_api, name='programs_api'),
    

    path("", include(router.urls)),
]
