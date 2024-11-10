# Generated by Django 5.1.1 on 2024-11-10 21:02

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Adviser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('picture', models.ImageField(default=False, upload_to='adviser_pictures')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=100)),
                ('active', models.BooleanField(default=True)),
                ('last_login', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'db_table': 'adviser',
                'permissions': [('view_canine_model', 'Can view canine model'), ('add_canine_model', 'Can add canine model'), ('change_canine_model', 'Can change canine model'), ('delete_canine_model', 'Can delete canine model')],
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('picture', models.CharField(default=None)),
                ('username', models.CharField(max_length=15)),
                ('email', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=250)),
                ('is_active', models.BooleanField(default=True)),
                ('last_login', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'db_table': 'user',
            },
        ),
        migrations.CreateModel(
            name='Canine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('picture', models.ImageField(upload_to=None)),
                ('age', models.IntegerField()),
                ('race', models.CharField(max_length=100)),
                ('pedigree', models.CharField(max_length=100)),
                ('gender', models.CharField(max_length=100)),
                ('color', models.CharField(max_length=100)),
                ('vaccines', models.BooleanField(default=False)),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('adviser', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='src.adviser')),
            ],
            options={
                'db_table': 'canine',
            },
        ),
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bill_no', models.CharField(max_length=50)),
                ('value', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('adviser', models.OneToOneField(default=0, on_delete=django.db.models.deletion.CASCADE, to='src.adviser')),
                ('canine', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='src.canine')),
                ('user', models.OneToOneField(default=0, on_delete=django.db.models.deletion.CASCADE, to='src.user')),
            ],
            options={
                'db_table': 'bill',
            },
        ),
    ]
