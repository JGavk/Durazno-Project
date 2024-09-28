from django.db import models


class User(models.Model):
    picture = models.ImageField(upload_to="pictures", default="default.jpg")
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    #is_admin = models.BooleanField(default=False)
    #is_superuser = models.BooleanField(default=False)
