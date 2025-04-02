from django.http import request
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Booking
from .serializers import BookingSerializer


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer

    def get_queryset(self):
        return Booking.objects.all()

    @action(detail=False, methods=["get"])
    def available(self, request):
        start_time = request.query_params.get("start_time")
        end_time = (request.query_params.get("end_time"),)

        if not start_time or not end_time:
            return Response(
                "start_time and end_time query parameters are required.", status=400
            )

        try:
            start_time = timezone.datetime.strptime(start_time, "%H:%M:%S").time()
            end_time = timezone.datetime.strptime(end_time, "%H:%M:%S").time()
        except ValueError:
            return Response("Invalid time format. Use HH:MM:SS.", status=400)

        overlapping_bookings = Booking.objects.filter(
            start_time__lt=end_time,
            end_time__gt=start_time,
        )

        is_available = not overlapping_bookings.exists()

        return Response(
            {
                "available": is_available,
                "conflicting_bookings": (
                    BookingSerializer(overlapping_bookings, many=True).data
                    if not is_available
                    else []
                ),
            }
        )
