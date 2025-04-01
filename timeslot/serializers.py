from rest_framework import serializers

from .models import Timeslot


class TimeslotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeslot
        fields = "__all__"


class TimeslotCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeslot
        fields = ["date", "time"]


class TimeslotUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeslot
        fields = ["date", "time"]


class TimeslotDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeslot
        fields = ["date", "time"]
