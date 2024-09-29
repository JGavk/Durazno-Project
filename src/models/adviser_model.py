from django.db import models


class Adviser(models.Model):
    picture = models.ImageField(upload_to="adviser_pictures", default=False)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    active = models.BooleanField(default=True)

#