# Generated by Django 5.1.1 on 2024-12-17 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0002_remove_canine_adviser_alter_canine_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='canine',
            name='price',
            field=models.DecimalField(decimal_places=5, default=0, max_digits=10),
        ),
    ]
