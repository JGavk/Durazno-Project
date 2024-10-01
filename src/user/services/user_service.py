from django.http import JsonResponse
from src.user.persistences import UserPersistence
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def user_register(request):

    if request.method == "POST":
        picture = request.FILES.get['picture']
        email = request.POST.get['email']
        password = request.POST.get['password']
        phone = request.POST.get['phone']
        address = request.POST.get['address']

        if not email or not password:
            return JsonResponse({'error': 'Email and password are required.'}, status=400)

        exists = UserPersistence.search_user(email)
        if exists:
            return JsonResponse({'error': 'User already exists.'}, status=400)

        user = UserPersistence.create_user(
            picture,
            email,
            password,
            phone,
            address
        )

        return JsonResponse({'message': 'User created successfully', 'user.id': user.id}, status=201)
