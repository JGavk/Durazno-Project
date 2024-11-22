from datetime import timezone

from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.contrib.auth import logout
from ...models.adviser_model import Adviser
from src.adviser.persistences import AdviserPersistence
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.utils import timezone

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
            "status": "ok",
            "details": "Login successful",
            "data": {
                "advisor_id": adviser.id,
                "advisor_name": adviser.name,
                "email": adviser.email,
                
            }
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
        return JsonResponse({"message": "Sesión activa", "advisor_id": user_id}, status=200)
    return JsonResponse({"error": "No hay sesión activa"}, status=401)

@api_view(['POST'])
def adviser_logout(request):
    try:
        logout(request)
        
        response = JsonResponse(data={"message": "Logout successful"}, status=200)
        
        response.delete_cookie('sessionid', samesite='Lax')
        
        return response
    except Exception as e:
        print(f"Error during logout: {str(e)}")
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)