import uuid
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Evento(models.Model):
    EVENT_TYPES= [
        ('CONFERENCE','CONFERENCE'),
        ('SEMINAR','SEMINAR'),
        ('CONGRESS','CONGRESS'),
        ('CURSE','CURSE')
    ]
    EVENT_PLACE = [
        ('PRESENCIAL', 'PRESENCIAL'),
        ('VIRTUAL', 'VIRTUAL'),
    ]
    id = models.UUIDField(primary_key = True,default = uuid.uuid4,editable = False)
    event_name = models.CharField(max_length=200)
    event_category = models.CharField(max_length=20,choices=EVENT_TYPES)
    event_place = models.CharField(max_length=200)
    event_address = models.CharField(max_length=200)
    event_initial_date = models.DateTimeField()
    event_final_date = models.DateTimeField()
    event_type = models.CharField(max_length=20,choices=EVENT_PLACE)
    thumbnail= models.CharField(max_length=2000)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
