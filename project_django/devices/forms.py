from django import forms

# from django.core.validators import MinValueValidator
from users.models import CustomUser
from devices.models import Device, Measure


class DeviceModelForm(forms.ModelForm):
    class Meta:
        model = Device
        # fields = "__all__"
        fields = [
            "user",
            "name",
            "capacity",
            "place",
            "is_active",
            "measurement_range",
            "longitude",
            "latitude",
        ]

    user = forms.CharField(widget=forms.HiddenInput())
    longitude = forms.CharField(widget=forms.HiddenInput())
    latitude = forms.CharField(widget=forms.HiddenInput())

    # def __init__ (self, *args, **kwargs):
    #   self.fields['name'].widget.attrs['readonly'] = True
