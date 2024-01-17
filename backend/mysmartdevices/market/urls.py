from django.urls import path, include
from market.views.auth import AuthView
from market.views.product import ProductListView
from market.views.category import CategoryListView
from market.views.basket import BasketInfoView

urlpatterns = [
        path('userlogin',AuthView.as_view()),
        path('category_list', CategoryListView.as_view()),
        path('product_list', ProductListView.as_view()),
        path('basket_list', BasketInfoView.as_view())
]