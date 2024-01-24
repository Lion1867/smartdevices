from django.core.management.base import BaseCommand
from market.models import Product
import random

class Command(BaseCommand):

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Start populating prices'))

        products_without_price = Product.objects.filter(price=0.00)

        for product in products_without_price:
            # Автоматическое заполнение цены, процента скидки и цены со скидкой
            product.price = round(random.uniform(15000, 90000), 0)
            product.discount_percentage = round(random.uniform(5, 25), 0)  # случайное значение от 5 до 25 процентов

            # Вычисление цены со скидкой
            discount_factor = 1 - (product.discount_percentage / 100)
            product.discounted_price = round(product.price * discount_factor, 0)

            product.save()

        self.stdout.write(self.style.SUCCESS('Prices populated successfully'))