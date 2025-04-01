from django.db import models


class Timeslot(models.Model):
    date = models.DateField()
    time = models.TimeField()
    is_booked = models.BooleanField(default=False)

    class Meta:
        db_table = "timeslot"
