from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogViewSet, get_todos, CustomTokenObtainPairView, CustomTokenRefreshView, logout, register, is_logged_in

# Initialisation du routeur pour les vues BlogViewSet
router = DefaultRouter()
router.register(r"blog", BlogViewSet)

# Définition des URLs
urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', logout),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('todos/', get_todos),
    path('register/', register),
    path('authenticated/', is_logged_in),
    path("", include(router.urls)),  # Inclure les routes définies dans le routeur pour BlogViewSet
]
