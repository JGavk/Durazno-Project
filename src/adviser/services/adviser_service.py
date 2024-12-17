from datetime import timezone
from django.contrib.auth.hashers import check_password
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from src.adviser.persistences import AdviserPersistence
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import login, logout
from django.http import JsonResponse
from django.utils import timezone
from src.models import Adviser

adviser_pers = AdviserPersistence()


def get_session_id(request):
    session_id = request.session.session_key
    return session_id


@api_view(['POST'])
def adviser_login(request):
    try:
        data = request.data
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return JsonResponse(data={'error': 'Missing email or password'}, status=400)

        adviser = Adviser.objects.filter(email=email).first()

        if not adviser or not check_password(password, adviser.password):
            return JsonResponse({"error": "Invalid credentials"}, status=401)

        request.session['user_id'] = adviser.id
        adviser.last_login = timezone.now()
        adviser.save()

        response = JsonResponse(data={
            "message": "Login successful",
            "advisor_id": adviser.id,
            "advisor_name": adviser.name,
            "email": adviser.email
        }, status=200)

        response.set_cookie(
            key='sessionid',
            value=request.session.session_key,
            httponly=True,
            samesite='Lax'
        )
        return response
    except ValidationError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        return JsonResponse({'error': 'An unexpected error occurred'}, status=500)


@api_view(['GET'])
def verify_session(request):
    user_id = request.session.get('user_id')

    if user_id:
        return JsonResponse({"message": "Active session", "advisor_id": user_id}, status=200)
    return JsonResponse({"error": "non session"}, status=401)


@api_view(['POST'])
def adviser_logout(request):
    try:
        logout(request)

        response = JsonResponse({"message": "Logout successful"}, status=200)

        response.delete_cookie('sessionid', samesite='Lax')

        return response
    except Exception as e:
        print(f"Error during logout: {str(e)}")
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def canine_register(request):
    try:
        data = request.data

        required_fields = ['picture', 'age', 'race', 'pedigree', 'gender', 'color', 'vaccines', 'price']

        if not all(data.get(field) for field in required_fields):
            return JsonResponse(data={'error': 'Missing data'}, status=400)

        dog_done = adviser_pers.register_canine(
            picture=data.get('picture'),
            age=data.get('age'),
            race=data.get('race'),
            pedigree=data.get('pedigree'),
            gender=data.get('gender'),
            color=data.get('color'),
            vaccines=data.get('vaccines'),
            price=data.get('price')
        )

        return JsonResponse(data={'status': 'ok', 'message': 'Register successful'}, status=200)
    except Exception as e:
        return JsonResponse(data={'error': str(e)}, status=500)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_canines(request):
    try:
        canine = adviser_pers.get_all_canines()
        print(canine)
        return JsonResponse(data={'canines': canine}, status=200)
    except Exception as e:
        return JsonResponse(data={'error': str(e)}, status=500)