from django.contrib.admin import decorators
from django.db import models


class Booking(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    date = models.DateField()
    start_time = models.TimeField(default="00:00:00")
    end_time = models.TimeField(default="00:00:00")
    message = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "booking"
