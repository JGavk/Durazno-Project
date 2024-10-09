from django.http import JsonResponse
from src.user.persistences import UserPersistence
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required


@api_view(['POST'])
def user_register(request):
    try:
        data = request.data
        picture = data.get('picture')
        email = data.get('email')
        phone = data.get('phone')
        address = data.get('address')
        password = data.get('password')
        print("HERE")
        if not email or not password:
            return JsonResponse({'error': 'Email and password are required.'}, status=400)

        user_persistence = UserPersistence()
        exists = user_persistence.search_user(email)
        if exists:
            return JsonResponse({'error': 'User already exists.'}, status=400)

        n_user = user_persistence.create_user(
            picture,
            email,
            phone,
            address,
            password
        )
        print(n_user)

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

        user_persistence = UserPersistence()
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

        user_persistence = UserPersistence()
        result = user_persistence.delete_user(email)

        if result == "User deleted":
            return JsonResponse({'status': 'ok', 'message': 'User deleted successfully.'}, status=200)
        elif result == "User not found":
            return JsonResponse({'status': 'fail', 'message': 'User not found.'}, status=404)
        else:
            return JsonResponse({'status': 'fail', 'message': result}, status=500)

    except Exception as error:
        return JsonResponse({'status': 'fail', 'message': str(error)}, status=500)


