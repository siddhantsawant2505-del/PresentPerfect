from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db.models import Q
from .models import Item, Order
from .serializers import ItemSerializer, OrderSerializer, UserSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def api_gifts(request):
    """
    List curated gifts with optional filtering by category, occasion, or search query.
    """
    category = request.GET.get('category')
    occasion = request.GET.get('occasion')
    search = request.GET.get('search')

    queryset = Item.objects.all()

    if category and category != 'all':
        queryset = queryset.filter(category__iexact=category)

    if occasion and occasion != 'all':
        queryset = queryset.filter(occasion__iexact=occasion)

    if search:
        queryset = queryset.filter(
            Q(name__icontains=search) | 
            Q(description__icontains=search) |
            Q(tag__icontains=search)
        )

    serializer = ItemSerializer(queryset, many=True)
    return Response({
        'status': 'success',
        'count': queryset.count(),
        'results': serializer.data
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def api_gift_detail(request, gift_id):
    """
    Retrieve single gift item by ID.
    """
    try:
        gift = Item.objects.get(id=gift_id)
        serializer = ItemSerializer(gift)
        return Response({'status': 'success', 'data': serializer.data})
    except Item.DoesNotExist:
        return Response({'status': 'error', 'message': 'Gift not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([AllowAny])
def api_login(request):
    """
    Authenticate user and create session.
    """
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'status': 'error', 'message': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        serializer = UserSerializer(user)
        return Response({
            'status': 'success',
            'message': 'Welcome to PresentPerfect Concierge',
            'user': serializer.data
        })
    else:
        return Response({'status': 'error', 'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def api_register(request):
    """
    Register new user client account.
    """
    username = request.data.get('username')
    email = request.data.get('email', '')
    password = request.data.get('password')

    if not username or not password:
        return Response({'status': 'error', 'message': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'status': 'error', 'message': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    login(request, user)
    serializer = UserSerializer(user)
    return Response({
        'status': 'success',
        'message': 'Account created successfully',
        'user': serializer.data
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([AllowAny])
def api_me(request):
    """
    Check current authenticated user state.
    """
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return Response({
            'authenticated': True,
            'user': serializer.data
        })
    return Response({
        'authenticated': False,
        'user': None
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def api_logout(request):
    """
    Log out active user.
    """
    logout(request)
    return Response({'status': 'success', 'message': 'Logged out successfully'})

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def api_orders(request):
    """
    GET: Retrieve order history.
    POST: Create a celebration order with gift items, recipient info, and packaging.
    """
    if request.method == 'GET':
        if request.user.is_authenticated:
            orders = Order.objects.filter(user=request.user)
        else:
            orders = Order.objects.all()[:15]
        serializer = OrderSerializer(orders, many=True)
        return Response({'status': 'success', 'orders': serializer.data})

    elif request.method == 'POST':
        data = request.data
        cart = data.get('cart', [])
        total_amount = data.get('totalAmount', 0)
        recipient_name = data.get('recipientName', '')
        delivery_date = data.get('deliveryDate', '')
        delivery_address = data.get('deliveryAddress', '')
        calligraphy_note = data.get('calligraphyNote', '')
        payment_method = data.get('paymentMethod', 'Credit Card')

        if not cart:
            return Response({'status': 'error', 'message': 'Gift box is empty'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(
            user=request.user if request.user.is_authenticated else None,
            recipient_name=recipient_name,
            delivery_date=delivery_date,
            delivery_address=delivery_address,
            calligraphy_note=calligraphy_note,
            cart=cart,
            total_amount=total_amount,
            payment_method=payment_method,
            payment_status='Paid'
        )

        serializer = OrderSerializer(order)
        return Response({
            'status': 'success',
            'message': 'Celebration gift order confirmed!',
            'order': serializer.data
        }, status=status.HTTP_201_CREATED)
