from django.contrib import admin

from .models import User

# Register your models here.


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """
    Admin configuration for User
    """

    list_display = ["name"]
    search_fields = ["name"]

    def quote_count(self, obj):
        return obj.quotes.count()

    quote_count.short_description = "Number of Quotes"
