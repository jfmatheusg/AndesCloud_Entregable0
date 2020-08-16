from django.contrib import admin

from .models import Evento,CustomUser

# Register your models here.
Models = [Evento, CustomUser]
admin.site.register(Models)
