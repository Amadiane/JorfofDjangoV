
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from base.views import home
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),
    path('', home),  # <--- la racine
# ]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
]
# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
