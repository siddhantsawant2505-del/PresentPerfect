from django.urls import path
from . import views
from . import api_views

urlpatterns = [
    # REST API Endpoints for Next.js Client
    path('api/gifts/', api_views.api_gifts, name='api_gifts'),
    path('api/gifts/<int:gift_id>/', api_views.api_gift_detail, name='api_gift_detail'),
    path('api/auth/login/', api_views.api_login, name='api_login'),
    path('api/auth/register/', api_views.api_register, name='api_register'),
    path('api/auth/logout/', api_views.api_logout, name='api_logout'),
    path('api/auth/me/', api_views.api_me, name='api_me'),
    path('api/orders/', api_views.api_orders, name='api_orders'),

    # Template endpoints (legacy / server-rendered fallback)
    path('', views.index, name='index'),
    path('userlogin.html', views.user_login, name='userlogin'),
    path('myorder.html', views.orders, name='adminlogin'),
    path('mycart.html', views.my_cart, name='mycart'),
    path('home.html', views.home, name='home'),
    path('categories.html', views.categories, name='categories'),
    path('categories1.html', views.categories1, name='categories1'),
    path('add-to-cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('login/', views.login_view, name='login'),
    path('myorder/', views.my_orders, name='my_orders'),
    path('checkout/', views.checkout, name='checkout'),
    path('process_checkout/', views.process_checkout, name='process_checkout'),
    path('userregistration.html', views.user_registration, name='user_registration'),
    path('register/', views.register, name='register'),
]
