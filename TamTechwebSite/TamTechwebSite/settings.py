import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url
import cloudinary_storage

# -------------------------
# 🔹 Chargement du .env
# -------------------------
load_dotenv()

# -------------------------
# 🔹 Répertoires de base
# -------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# -------------------------
# 🔹 Sécurité Django
# -------------------------
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-dev-key')

# DEBUG = os.getenv('DEBUG', 'False') == 'True'
DEBUG = True
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    'jorfofdjangov.onrender.com',
    "jorfof-django-v.vercel.app",
    "api.jorfofbasketclub.com",
]

# -------------------------
# 🔹 Applications installées
# -------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',

     # cloudinary
    'cloudinary',
    'cloudinary_storage',
    'django_filters',

    # apps locales
    'base',  # Remplace par ton app principale (si c’est autre chose que base)
    # tes apps locales
    'news',            # ✅ ajoute ceci          # si tu as une app video
    'phototheque',     # si tu as album/photo
    'missions',
    'valeurs',
    'match',
    'equipe',
    'partners',
    'contact',
    'community',
    'newsletter',
    'motpresident',

   
]

# -------------------------
# 🔹 Middleware
# -------------------------
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}


# -------------------------
# 🔹 URL & WSGI
# -------------------------
ROOT_URLCONF = 'TamTechwebSite.urls'
WSGI_APPLICATION = 'TamTechwebSite.wsgi.application'

# -------------------------
# 🔹 Base de données
# -------------------------
DATABASE_URL = os.environ.get("DATABASE_URL")

if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.config(default=DATABASE_URL, conn_max_age=600)
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'jorfofdb',
            'USER': 'root',
            'PASSWORD': 'root',
            'HOST': 'localhost',
            'PORT': '3306',
            'OPTIONS': {
                'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
            }
        }
    }

# -------------------------
# 🔹 Cloudinary (Images)
# -------------------------
import os
from pathlib import Path
from dotenv import load_dotenv
import cloudinary
import cloudinary_storage

# load_dotenv()

# BASE_DIR = Path(__file__).resolve().parent.parent

# --- Cloudinary ---
# -------------------------
# 🔹 Cloudinary (Images)
# -------------------------

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.getenv('CLOUDINARY_CLOUD_NAME'),
    'API_KEY': os.getenv('CLOUDINARY_API_KEY'),
    'API_SECRET': os.getenv('CLOUDINARY_API_SECRET'),
}

cloudinary.config(
    cloud_name=CLOUDINARY_STORAGE['CLOUD_NAME'],
    api_key=CLOUDINARY_STORAGE['API_KEY'],
    api_secret=CLOUDINARY_STORAGE['API_SECRET']
)

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'


# Fichiers statiques (CSS, JS…)
# STATIC_URL = '/static/'
# STATICFILES_DIRS = [BASE_DIR / "static"]
# STATIC_ROOT = BASE_DIR / "staticfiles"

# MEDIA_URL = '/media/'
# MEDIA_ROOT = BASE_DIR / "media"




# -------------------------
# 🔹 Templates
# -------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# -------------------------
# 🔹 Fichiers statiques
# -------------------------
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"

# -------------------------
# 🔹 Internationalisation
# -------------------------
LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'Africa/Casablanca'
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# -------------------------
# 🔹 CORS & CSRF (Frontend Vercel)
# -------------------------
CORS_ALLOWED_ORIGINS = [
    "https://jorfof-django-v.vercel.app",
    "https://jorfofdjangov.onrender.com",
    "https://jorfofbasketclub.com",
    "https://www.jorfofbasketclub.com",
    "http://localhost:5173",                # ton frontend local (Vite)
    "http://127.0.0.1:5173",                # parfois utile selon ton navigateur
]

CSRF_TRUSTED_ORIGINS = [
    "https://jorfof-django-v.vercel.app",
    "https://jorfofdjangov.onrender.com",
    "https://jorfofbasketclub.com",
    "https://www.jorfofbasketclub.com",
    "http://localhost:5173",                # ton frontend local (Vite)
    "http://127.0.0.1:5173",                # parfois utile selon ton navigateur
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = False  # Sécurisé
CORS_ALLOW_HEADERS = ["*"]
# CORS_ALLOW_METHODS = ["DELETE", "GET", "OPTIONS", "PATCH", "POST", "PUT"]

print("Cloudinary name:", os.getenv('CLOUDINARY_CLOUD_NAME'))




# --- Email configuration LWS (sécurisé et compatible Django) ---
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "mail81.lwspanel.com"
EMAIL_PORT = 465
EMAIL_USE_SSL = True
EMAIL_USE_TLS = False
EMAIL_HOST_USER = "contact@jorfofbasketclub.com"
EMAIL_HOST_PASSWORD = "Jorfof@2025"
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
CONTACT_ADMIN_EMAIL = EMAIL_HOST_USER

