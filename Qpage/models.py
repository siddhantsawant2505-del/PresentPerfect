from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Cart(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return self.name

class CartUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Userlog(models.Model):
    username = models.CharField(max_length=100)    
    password = models.CharField(max_length=100)

class Adminlog(models.Model):  
    username = models.CharField(max_length=100)    
    password = models.CharField(max_length=100)

class Item(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=500, default='')
    category = models.CharField(max_length=100, default='luxury')
    occasion = models.CharField(max_length=100, default='anniversary')
    tag = models.CharField(max_length=100, default='Curated Keepsake')
    rating = models.CharField(max_length=50, default='4.9 (120)')

    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    recipient_name = models.CharField(max_length=255, default='', blank=True)
    delivery_date = models.CharField(max_length=100, default='', blank=True)
    delivery_address = models.TextField(default='', blank=True)
    calligraphy_note = models.TextField(default='', blank=True)
    cart = models.JSONField(default=list)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=100, default='Credit Card')
    payment_status = models.CharField(max_length=50, default='Paid')
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        user_label = self.user.username if self.user else (self.recipient_name or f"Order #{self.id}")
        return f"Order #{self.id} for {user_label}"

    class Meta:
        ordering = ['-timestamp']
