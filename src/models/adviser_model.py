from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.hashers import make_password, check_password


class Adviser(models.Model):
    picture = models.ImageField(upload_to="adviser_pictures", default=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=250)
    active = models.BooleanField(default=True)
    last_login = models.DateTimeField(default=timezone.now)
    
    #USERNAME_FIELD = 'email'
    #REQUIRED_FIELDS = ['name', 'password', 'active',]

    def set_password(self, password):
        self.password = make_password(password)

    def check_password(self, password):
        return check_password(password, self.password)

    class Meta:
        db_table = 'adviser'
        permissions = [
                ("view_canine_model", "Can view canine model"),
                ("add_canine_model", "Can add canine model"),
                ("change_canine_model", "Can change canine model"),
                ("delete_canine_model", "Can delete canine model"),
            ]
        
    def __str__(self):
        return f'Adviser: {self.name}'
#-
