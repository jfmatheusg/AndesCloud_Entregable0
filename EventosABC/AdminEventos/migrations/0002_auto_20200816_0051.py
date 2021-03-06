# Generated by Django 3.1 on 2020-08-16 00:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AdminEventos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='evento',
            name='event_category',
            field=models.CharField(choices=[('CONFERENCE', 'Conferencia'), ('SEMINAR', 'Seminario'), ('CONGRESS', 'Congreso'), ('CURSE', 'Curso')], max_length=20),
        ),
        migrations.AlterField(
            model_name='evento',
            name='event_type',
            field=models.CharField(choices=[('PRESENCIAL', 'Presencial'), ('VIRTUAL', 'Virtual')], max_length=20),
        ),
    ]
