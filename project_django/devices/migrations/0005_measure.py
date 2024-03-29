# Generated by Django 4.1.7 on 2023-10-21 20:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('devices', '0004_alter_device_capacity'),
    ]

    operations = [
        migrations.CreateModel(
            name='Measure',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('capacity', models.IntegerField(blank=True, verbose_name='Capacidade do reservatório (L)')),
                ('ph', models.FloatField(blank=True, verbose_name='pH')),
                ('quantity_substance', models.IntegerField(blank=True, verbose_name='Quantidade de substancia (ml)')),
                ('substance_type', models.CharField(blank=True, max_length=15, verbose_name='Tipo de substancia')),
                ('device', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='devices.device', verbose_name='Aparelho')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='Proprietário')),
            ],
        ),
    ]
