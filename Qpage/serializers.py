from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Item, Order

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ItemSerializer(serializers.ModelSerializer):
    price = serializers.FloatField()

    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'price', 'image', 'category', 'occasion', 'tag', 'rating']

class OrderSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    total_amount = serializers.FloatField()

    class Meta:
        model = Order
        fields = [
            'id', 'username', 'recipient_name', 'delivery_date', 
            'delivery_address', 'calligraphy_note', 'cart', 
            'total_amount', 'payment_method', 'payment_status', 'timestamp'
        ]
