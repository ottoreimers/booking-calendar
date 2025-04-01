from django.contrib import admin

from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    """
    Admin configuration for Booking
    """

    list_display = ["name", "email", "date", "start_time", "end_time"]
    search_fields = ["name", "email", "date", "start_time", "end_time"]
    list_filter = ["name", "email", "date", "start_time", "end_time"]
    list_per_page = 10
    list_max_show_all = 100
    list_select_related = False
    list_display_links = ["name", "email"]
    list_editable = []
