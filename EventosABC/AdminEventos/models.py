import uuid
import os

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Evento(models.Model):
    EVENT_TYPES= [
        ('CONFERENCE', 'CONFERENCE'),
        ('SEMINAR', 'SEMINAR'),
        ('CONGRESS', 'CONGRESS'),
        ('CURSE', 'CURSE')
    ]
    EVENT_PLACE = [
        ('PRESENCIAL', 'PRESENCIAL'),
        ('VIRTUAL', 'VIRTUAL'),
    ]

    def path_and_rename(path):
        def wrapper(instance, filename):
            ext = filename.split('.')[-1]
            filename = '{}.{}'.format(uuid.uuid4(), ext)
            return os.path.join(path, filename)
        return wrapper

    id = models.UUIDField(primary_key = True,default = uuid.uuid4,editable = False)
    event_name = models.CharField(max_length=200)
    event_category = models.CharField(max_length=20,choices=EVENT_TYPES)
    event_place = models.CharField(max_length=200)
    event_address = models.CharField(max_length=200)
    event_initial_date = models.DateTimeField()
    event_final_date = models.DateTimeField()
    event_type = models.CharField(max_length=20,choices=EVENT_PLACE)
    thumbnail = models.ImageField(upload_to=path_and_rename('event_thumbnails/'), null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
