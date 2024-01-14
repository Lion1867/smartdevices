from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework import serializers

from market.filters import ProductFilter

from market.models import Category, Product

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    products = serializers.SerializerMethodField()

    def get_products(self,obj):
        out = []
        for item in Product.objects.filter(category=obj):
            out.append(ProductSerializer_1(item).data)
        return out

    class Meta:
        model = Category
        fields = ['id', 'name', 'get_small_image_url', 'products']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'get_small_image_url']

class ProductSerializer_1(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'get_small_image_url']

class ProductListView(ListModelMixin,GenericAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_class = ProductFilter
    def get(self,request, *args, **kwargs):
        return self.list(request, *args, **kwargs)