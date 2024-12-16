from django.db import models
from src.models import Adviser


class Canine(models.Model):
    picture = models.CharField(max_length=255)
    age = models.IntegerField()
    race = models.CharField(max_length=100)
    pedigree = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    vaccines = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    class Meta:
        db_table = 'canine'
#