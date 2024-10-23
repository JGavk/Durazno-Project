from django.contrib import admin
from .models import User, Adviser, Canine, Bill


class AuthorAdmin(admin.ModelAdmin):
    pass

adminSite = admin.site

adminSite.site_header = "Durazno Admin"
adminSite.site_title = "Durazno Admin Portal"
adminSite.index_title = "Welcome to Durazno Portal"
adminSite.enable_nav_sidebar = False


@admin.register(Adviser)
class AdviserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'active')
    list_filter = ('active',)
    search_fields = ('name', 'email')
    list_per_page = 10
    fieldsets = (
        ('Adviser Info', {
            'fields': ('picture', 'name', 'email', 'password')
        }),
        ('Status', {
            'fields': ('active', 'last_login')
        })
    )
    # readonly_fields = 

    # actions = 
    # filter_horizontal = 
    # list_select_related = 
    # list_display_links = 
    # list_editable = 
    # list_max_show_all = 
    # list_display_links = 
    # list_display_links_details = 

admin.site.register(User)
admin.site.register(Canine)
admin.site.register(Bill)
