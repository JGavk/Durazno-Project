from django.contrib import admin
from django.urls import path
from src.user.services.user_service import *

#
urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/register', user_register, name='user_register'),
    path('user/up', update_user, name='update_user'),
    path('user/del', delete_user, name='update_user'),
]
