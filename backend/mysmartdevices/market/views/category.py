
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action

from market.models import Category

from rest_framework.generics import ListAPIView

from market.views.product import CategorySerializer

class CategoryListView(ListAPIView):
    serializer_class = CategorySerializer
    pagination_class = None

    def get_queryset(self):
        return Category.objects.all().order_by('-id')

class CategoryViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows users to read and modify categories.
    """
    queryset = Category.objects.all().order_by('-id')
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['get', 'post']

    @action(detail=False, methods=['get'])
    def set_password(self, request):
        pass