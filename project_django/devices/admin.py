from django.contrib import admin
from devices.models import Device, Measure


# Register your models here.
@admin.register(Device)
class DeviceModelAdmin(admin.ModelAdmin):
    model = Device
    list_display = ["user", "name", "capacity", "place"]


@admin.register(Measure)
class MeasureModelAdmin(admin.ModelAdmin):
    model = Measure
    list_display = ["user", "device", "capacity", "ph", "quantity_substance"]
