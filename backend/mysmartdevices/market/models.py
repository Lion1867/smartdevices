from django.db import models

from django.contrib.auth.models import User

from django.utils.safestring import mark_safe

from image_cropping.fields import ImageRatioField, ImageCropField
from easy_thumbnails.files import get_thumbnailer

from mysmartdevices.settings import BASE_URL

class Provider(User):
    name = models.CharField(max_length=250, default='')
    phone = models.CharField(max_length=250, default='')
    rating = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Provider'
        verbose_name_plural = 'Providers'

class Consumer(User):
    name = models.CharField(max_length=250, default='')
    phone = models.CharField(max_length=250, default='')
    address = models.TextField(default='')
    geo_location = models.CharField(max_length=250, default='')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Consumer'
        verbose_name_plural = 'Consumers'

class Category(models.Model):
    name = models.CharField(max_length=250, default='')
    image = ImageCropField(upload_to='category', null=True, blank=True)

    def __str__(self):
        return self.name

    cropping = ImageRatioField('image', '40x40')

    @property
    def image_tag(self):
        return mark_safe('<img src="%s" />' % self.image.url)

    @property
    def get_small_image_url(self):
        return BASE_URL + get_thumbnailer(self.image).get_thumbnail({
            'size': (40, 40),
            'box': self.cropping,
            'crop': 'smart',
        }).url

    @property
    def get_small_image(self):
        return mark_safe('<img src="%s" />' % get_thumbnailer(self.image).get_thumbnail({
            'size': (40, 40),
            'box': self.cropping,
            'crop': 'smart',
        }).url)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

class Product(models.Model):
    name = models.CharField(max_length=250, default='')
    image = ImageCropField(upload_to='product', null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    discounted_price = models.DecimalField(max_digits=8, decimal_places=2, default=0)

    cropping = ImageRatioField('image', '200x200')

    @property
    def image_tag(self):
        return mark_safe('<img src="%s" />' % self.image.url)

    @property
    def get_small_image(self):
        return mark_safe('<img src="%s" />' % self.get_small_image_url)

    @property
    def get_small_image_url(self):
        return BASE_URL + get_thumbnailer(self.image).get_thumbnail({
            'size': (200, 200),
            'box': self.cropping,
            'crop': 'smart',
        }).url

    def __str__(self):
        return '%s (%s)' % (self.name, self.category)

    class Meta:
            verbose_name = 'Product'
            verbose_name_plural = 'Products'

class Store(models.Model):
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    #price = models.DecimalField(max_digits=8, decimal_places=2)
    class Meta:
        verbose_name = 'Store'
        verbose_name_plural = 'Stores'

class Order(models.Model):

    STATUS = (
        ('new', 'new order'),
        ('pending', 'pending order'),
        ('finished', 'finished order')
    )

    consumer = models.ForeignKey(Consumer, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=250, default='new', choices=STATUS)
    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

class OrderProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, blank=True)
    ammount = models.IntegerField(default=0)
    class Meta:
        verbose_name = 'OrderProduct'
        verbose_name_plural = 'OrderProducts'