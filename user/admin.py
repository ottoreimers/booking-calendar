from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """
    Admin configuration for User
    """

    list_display = ["name", "email"]
    search_fields = ["name", "email"]
    list_filter = ["name", "email"]
    list_per_page = 10
    list_max_show_all = 100
    list_select_related = False
    list_display_links = ["name", "email"]
    list_editable = []
