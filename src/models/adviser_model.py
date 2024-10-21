from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password


class Adviser(models.Model):
    picture = models.ImageField(upload_to="adviser_pictures", default=False)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    active = models.BooleanField(default=True)
    last_login = models.DateTimeField(default=timezone.now)

    def set_password(self, password):
        self.password = make_password(password)

    def check_password(self, password):
        return check_password(password, self.password)

    class Meta:
        db_table = 'adviser'

#-
