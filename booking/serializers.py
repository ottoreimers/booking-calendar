from rest_framework import serializers

from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"

        def validate(self, data):
            if data["start_time"] >= data["end_time"]:
                raise serializers.ValidationError(
                    "End time must be later than start time."
                )

            overlapping_bookings = Booking.objects.filter(
                date=data["date"],
                start_time__lt=data["end_time"],
                end_time__gt=data["start_time"],
            )

            if self.instance:
                overlapping_bookings = overlapping_bookings.exclude(pk=self.instance.pk)

            if overlapping_bookings.exists():
                raise serializers.ValidationError(
                    "Booking overlaps with existing booking."
                )

            return data

        def create(self, validated_data):
            validated_data["name"] = self.context["request"].user.name
            return super().create(validated_data)


class BookingGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["id", "name", "email", "date", "start_time", "end_time", "message"]


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["id", "name", "email", "date", "start_time", "end_time", "message"]


class BookingUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["id", "name", "email", "date", "start_time", "end_time", "message"]


class BookingDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["id", "email"]
