from rest_framework import serializers
from .models import Evento, CustomUser


class UserSerializerIn(serializers.ModelSerializer):
    password = serializers.CharField()

    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def create(self, validated_data):
        return CustomUser.objects.create(**validated_data)


class UserSerializerOut(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'email']


class EventSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(required=False)

    class Meta:
        model = Evento
        fields = ["id", "event_name", "event_category", "event_place", "event_address", "event_initial_date",
                  "event_final_date", "event_type", "thumbnail"]

