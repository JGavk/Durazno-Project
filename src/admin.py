from django.contrib import admin
from .models import User, Adviser, Canine, Bill


class AuthorAdmin(admin.ModelAdmin):
    pass


admin.site.register(User)
admin.site.register(Adviser)
admin.site.register(Canine)
admin.site.register(Bill)
