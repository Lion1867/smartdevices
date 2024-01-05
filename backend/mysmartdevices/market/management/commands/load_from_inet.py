from django.core.management.base import BaseCommand, CommandError

from market.models import Category, Product
from bs4 import BeautifulSoup
import requests
from django.core.files import File
import shutil
from mysmartdevices.settings import BASE_DIR
import os
from PIL import Image

# Функция для сохранения деталей товара
def save_product_details(cat, product_name, product_url):
    # Запрос на страницу товара для получения изображения
    product_response = requests.get(product_url)
    product_soup = BeautifulSoup(product_response.text, 'html.parser')

    # Находим первую картинку на странице товара
    first_image_tag = product_soup.find('img')
    if first_image_tag and 'src' in first_image_tag.attrs:
        img_url = first_image_tag['src']
        if not img_url.startswith('http'):
            img_url = 'https://www.mi.com' + img_url

        # Загружаем картинку
        img_response = requests.get(img_url, stream=True)
        if img_response.status_code == 200:
            with open('tmp.png', 'wb') as out_file:
                shutil.copyfileobj(img_response.raw, out_file)

            # Пытаемся открыть изображение
            try:
                with Image.open('tmp.png') as img:
                    # Дополнительные проверки перед сохранением изображения
                    if img.width and img.height:
                        product = Product()
                        product.name = product_name
                        product.category = cat

                        # Сохраняем картинку в модели
                        with open('tmp.png', 'rb') as img_file:
                            product.image.save(f'{product_name}.png', File(img_file), save=True)
                        product.save()
                        print(f'Product "{product_name}" saved with image.')
                    else:
                        print(f'Invalid image for product "{product_name}".')
            except IOError:
                print(
                    f'Error processing image for product "{product_name}". Image might be corrupted or in an unsupported format.')

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Clearing DB')
        # удаляем записи и картинки
        Category.objects.all().delete()
        Product.objects.all().delete()
        if os.path.exists('%s/media' % BASE_DIR):
            shutil.rmtree('%s/media' % BASE_DIR)

        # достаем главную страницу и парсим
        URL = 'https://www.mi.com/ru/sitemap'
        print('Start importing from %s' % URL)
        response = requests.get(URL)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Находим все подкатегории и товары внутри категории "Умный дом"
        for two_level in soup.select('.sitemap__product__two-level'):
            category_title = two_level.find('h3').get_text(strip=True)

            # Проверяем наличие товаров в категории
            first_product_link = two_level.select_one('.sitemap__product__item a')
            if first_product_link:
                product_url = first_product_link['href']

                # Запрос на страницу товара
                product_response = requests.get(product_url)
                product_soup = BeautifulSoup(product_response.text, 'html.parser')

                # Находим первую картинку на странице товара
                first_image_tag = product_soup.find('img')
                if first_image_tag and 'src' in first_image_tag.attrs:
                    img_url = first_image_tag['src']
                    if not img_url.startswith('http'):
                        img_url = 'https://www.mi.com' + img_url  # Добавляем базовый URL, если необходимо

                    # Создаем объект категории
                    c = Category()
                    c.name = category_title

                    # Загружаем картинку
                    img_response = requests.get(img_url, stream=True)
                    if img_response.status_code == 200:
                        with open('tmp.png', 'wb') as out_file:
                            shutil.copyfileobj(img_response.raw, out_file)

                        # Сохраняем картинку в модели
                        with open('tmp.png', 'rb') as img_file:
                            c.image.save(f'{category_title}.png', File(img_file), save=True)

                    c.save()
                    print(f'Category "{category_title}" with image saved.')

                # Перебираем все ссылки на товары в категории
                product_links = two_level.select('.sitemap__product__item a')
                for link in product_links:
                    product_name = link.get_text(strip=True)
                    product_url = link['href']
                    save_product_details(c, product_name, product_url)