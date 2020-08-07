from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Evento

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create(**validated_data)

class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Evento
        fields = ["id","event_name","event_category","event_place","event_address","event_initial_date","event_final_date","event_type","thumbnail",]
