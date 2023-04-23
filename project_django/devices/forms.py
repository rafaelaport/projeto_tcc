from django import forms
from .models import Device


class DeviceModelForm(forms.ModelForm):
    class Meta:
        model = Device
        fields = "__all__"

