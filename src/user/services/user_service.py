from django.http import JsonResponse
from src.user.persistences import UserPersistence
from rest_framework.decorators import api_view
from rest_framework.response import Response


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
            None,
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
@api_view(['POST'])
def update_user(request):
    data = request.data
    user_persistence = UserPersistence()
    exists = user_persistence.search_user(data['email'])
    if exists:
        try:
            user_persistence.update_user(
                data['picture'],
                data['email'],
                data['phone'],
                data['address'],
                data['password']
            )
            return JsonResponse({'status': 'ok.'}, status=200)
        except Exception as error:
            return JsonResponse({'status': 'fail', "message": error}, status=500)

    #try:
    # data = request.data
    # user_persistence = UserPersistence()
    # exists = user_persistence.search_user(data['email'])

    # return JsonResponse({'User with email': exists, "exists": 'ok'}, status=200)

#  except Exception as error:
#  return JsonResponse({'status': 'fail', "message": error}, status=500)
