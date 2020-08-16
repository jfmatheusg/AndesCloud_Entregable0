import uuid
import os

from django.db import models
from django.utils import timezone
from django.utils.deconstruct import deconstructible
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)


@deconstructible
class UploadToPathAndRename(object):

    def __init__(self, path):
        self.sub_path = path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        filename = '{}.{}'.format(uuid.uuid4(), ext)
        return os.path.join(self.sub_path, filename)


class Evento(models.Model):
    EVENT_TYPES = [
        ('CONFERENCE', 'Conferencia'),
        ('SEMINAR', 'Seminario'),
        ('CONGRESS', 'Congreso'),
        ('CURSE', 'Curso')
    ]
    EVENT_PLACE = [
        ('PRESENCIAL', 'Presencial'),
        ('VIRTUAL', 'Virtual'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_name = models.CharField(max_length=200)
    event_category = models.CharField(max_length=20, choices=EVENT_TYPES)
    event_place = models.CharField(max_length=200)
    event_address = models.CharField(max_length=200)
    event_initial_date = models.DateTimeField()
    event_final_date = models.DateTimeField()
    event_type = models.CharField(max_length=20, choices=EVENT_PLACE)
    thumbnail = models.ImageField(upload_to=UploadToPathAndRename('event_thumbnails/'), null=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    creation_time = models.DateTimeField(default=timezone.now, editable=False)
