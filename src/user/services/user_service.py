import requests
from django.http import JsonResponse
from src.user.persistences import UserPersistence
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.utils import timezone

user_persistence = UserPersistence()

def validate_recaptcha(recaptcha_token):
    secret_key = '6Lc5PoIqAAAAABmcbAP08IybyMnf-gQKLVGYxDCr'
    url = 'https://www.google.com/recaptcha/api/siteverify'
    data = {
        'secret': secret_key,
        'response': recaptcha_token,
    }
    response = requests.post(url, data=data)
    result = response.json()
    return result.get('success', False)

@api_view(['POST'])
def user_register(request):
    try:
        data = request.data
        picture = data.get('picture')
        username = data.get('username')
        email = data.get('email')
        phone = data.get('phone')
        address = data.get('address')
        password = data.get('password')
        recaptcha_token = data.get('recaptchaToken')
        
        if not email or not password:
            return JsonResponse({'error': 'Email and password are required.'}, status=400)
        
        if not validate_recaptcha(recaptcha_token):
            return JsonResponse({'error': 'Captcha inválido o no verificado.'}, status=400)

        exists = user_persistence.search_user(email)
        if exists:
            return JsonResponse({'error': 'User already exists.'}, status=400)

        n_user = user_persistence.create_user(
            picture,
            username,
            email,
            phone,
            address,
            password
        )

        return JsonResponse({'status': 'ok.'}, status=200)
    except Exception as error:
        return JsonResponse({'status': 'fail', "message": error}, status=500)


#IN PROGRESSS
@login_required
@api_view(['POST'])
def update_user(request):
    try:
        if request.user.is_authenticated:
            user = request.user
        else:
            return JsonResponse({'error': 'You are not logged in.'}, status=401)

        data = request.data
        picture = data.get('picture', None)
        phone = data.get('phone', None)
        address = data.get('address', None)
        password = data.get('password', None)

        update_result = user_persistence.update_user(
            picture=picture,
            email=user.email,
            phone=phone,
            address=address,
            password=password
        )
        print(update_result)
        return JsonResponse({'status': 'ok', 'message': 'User updated successfully.'}, status=200)

    except Exception as error:
        return JsonResponse({'status': 'fail', 'message': str(error)}, status=500)


@api_view(['DELETE'])
def delete_user(request):
    try:

        data = request.data
        email = data.get('email')

        if not email:
            return JsonResponse({'status': 'fail', 'message': 'Email is required.'}, status=400)

        result = user_persistence.delete_user(email)

        if result == "User deleted":
            return JsonResponse({'status': 'ok', 'message': 'User deleted successfully.'}, status=200)
        elif result == "User not found":
            return JsonResponse({'status': 'fail', 'message': 'User not found.'}, status=404)
        else:
            return JsonResponse({'status': 'fail', 'message': result}, status=500)

    except Exception as error:
        return JsonResponse({'status': 'fail', 'message': str(error)}, status=500)


def get_session_id(request):
    session_id = request.session.session_key
    return session_id


@api_view(['POST'])
def user_login(request):
    try:
        data = request.data
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({'error': 'Email and password are required.'}, status=400)

        user = user_persistence.login_user(email, password)

        if user:
            login(request, user)
            session_id = get_session_id(request)
            print(f"Session ID: {session_id}")
            user.last_login = timezone.now()
            return JsonResponse({'status': 'ok', 'message': 'User logged in.'}, status=200)
        else:
            return JsonResponse({'status': 'fail', 'message': 'Invalid credentials.'}, status=401)

    except Exception as error:
        return JsonResponse({'status': 'fail', 'message': str(error)}, status=500)


@api_view(['GET'])
def get_all_users(request):
    try:
        users = UserPersistence.get_all_users()
        return JsonResponse({'status': 'ok', 'users': users}, status=200)
    except Exception as error:
        return JsonResponse({'status': 'fail', 'message': str(error)}, status=500)