from django.contrib import admin
from django.urls import path, include

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="SmartDevices API",
      default_version='v1',
       description=''' 
               Documentation `ReDoc` view can be found [here](/doc).
           ''',
      contact=openapi.Contact(email="lion022014@mail.ru"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

from rest_framework import routers
from market.views.category import CategoryViewSet
router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet)

from market.views.index import index

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('v1/', include([
        path('viewsets/', include(router.urls)),
        path('generic/', include('market.urls'))
    ])),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('doc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

from django.conf import settings
from django.conf.urls.static import static

urlpatterns += [
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)