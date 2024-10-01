from django.contrib import admin
from django.urls import path
from src.user.services.user_service import user_register

#
urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/register', user_register, name='Register User'),
]
