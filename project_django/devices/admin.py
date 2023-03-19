from django.contrib import admin
from . models import Device


# Register your models here.
@admin.register(Device)
class DeviceModelAdmin(admin.ModelAdmin):
    list_display = ["name", "capacity", "place"]
