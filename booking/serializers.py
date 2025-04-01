from rest_framework import serializers

from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["name", "email", "date", "time", "message"]


class BookingUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["name", "email", "date", "time", "message"]


class BookingDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["email"]


class BookingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["name", "email", "date", "time"]
