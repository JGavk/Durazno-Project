from django.db import models
from src.models import Canine, User, Adviser


class Bill(models.Model):
    bill_no = models.CharField(max_length=50, serialize=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=0)
    adviser = models.OneToOneField(Adviser, on_delete=models.CASCADE, default=0)
    canine = models.ForeignKey(Canine, on_delete=models.CASCADE, default=0)
    value = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        db_table = 'bill'

#