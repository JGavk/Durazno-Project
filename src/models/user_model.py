from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone


class User(models.Model):
    picture = models.CharField(default=None)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    password = models.CharField(max_length=250)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(default=timezone.now)
    #is_admin = models.BooleanField(default=False)
    #is_superuser = models.BooleanField(default=False)
    #
    def set_password(self, password):
        from django.contrib.auth.hashers import make_password
        self.password = make_password(password)

    def check_password(self, password):
        return check_password(password, self.password)

    class Meta:
        db_table = 'user'
