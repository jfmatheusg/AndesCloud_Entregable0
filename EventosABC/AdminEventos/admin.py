from django.contrib import admin

from AdminEventos.models import Evento

# Register your models here.
Models = [Evento]
admin.site.register(Models)
