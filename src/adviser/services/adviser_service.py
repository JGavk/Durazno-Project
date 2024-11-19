from datetime import timezone

from src.adviser.persistences import AdviserPersistence
from rest_framework.decorators import api_view
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

