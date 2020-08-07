# Generated by Django 3.1 on 2020-08-07 03:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Evento',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('event_name', models.CharField(max_length=200)),
                ('event_category', models.CharField(choices=[('CONFERENCE', 'CONFERENCE'), ('SEMINAR', 'SEMINAR'), ('CONGRESS', 'CONGRESS'), ('CURSE', 'CURSE')], max_length=20)),
                ('event_place', models.CharField(max_length=200)),
                ('event_address', models.CharField(max_length=200)),
                ('event_initial_date', models.DateTimeField()),
                ('event_final_date', models.DateTimeField()),
                ('event_type', models.CharField(choices=[('PRESENCIAL', 'PRESENCIAL'), ('VIRTUAL', 'SEMINAR')], max_length=20)),
                ('thumbnail', models.CharField(max_length=2000)),
            ],
        ),
    ]
