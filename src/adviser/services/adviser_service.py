from datetime import timezone
from rest_framework.permissions import IsAuthenticated
from src.adviser.persistences import AdviserPersistence
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import login
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

        adviser = adviser_pers.login_adviser(email, password)
        if adviser:
            login(request, adviser)
            session_id = get_session_id(request)
            print(f"Session ID: {session_id}")
            adviser.last_login = timezone.now()
            return JsonResponse(data={'status': 'ok', 'message': 'Login successful'}, status=200)
        else:
            return JsonResponse(data={'error': 'Invalid email or password'}, status=400)

    except Exception as e:
        return JsonResponse(data={'error': str(e)}, status=500)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def canine_register(request):
    try:
        data = request.data
        picture = data.get('picture', request.FILES.get('picture'))
        age = data.get('age')
        race = data.get('race')
        pedigree = data.get('pedigree')
        gender = data.get('gender')
        color = data.get('color')
        vaccine = data.get('vaccine')
        price = data.get('price')

        if not data:
            return JsonResponse(data={'error': 'Missing data'}, status=400)

        dog_done = adviser_pers.register_canine(
            picture,
            age,
            race,
            pedigree,
            gender,
            color,
            vaccine,
            price
        )

        return JsonResponse(data={'status': 'ok', 'message': 'Register successful'}, status=200)
    except Exception as e:
        return JsonResponse(data={'error': str(e)}, status=500)
