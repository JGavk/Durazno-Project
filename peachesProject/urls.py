from django.contrib import admin
from django.urls import path, include
from src.user.services.user_service import *
from src.adviser.services.adviser_service import *

# URLs for the project
urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/register', user_register, name='user_register'),
    path('user/up', update_user, name='update_user'),
    path('user/del', delete_user, name='delete_user'),
    path('login/', user_login, name='login'),
    path('clog/', adviser_login, name='clog'),
    path('users/', get_all_users, name='get_all_users'),
    path('users/<int:id>', get_user_by_id, name='get_user_by_id'),
    path('logout/', user_logout, name='user_logout'),
    path('signin/', adviser_login, name='adviser'),
    path('doggo/', canine_register, name='canine_register'),
    path('adv/login/', adviser_login, name='adviser_login'),
    path('adv/logout/', adviser_logout, name='adviser_logout'),
    path('adv/verify/', verify_session, name='verify_session'),
]
