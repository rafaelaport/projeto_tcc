from django import forms

# from django.core.validators import MinValueValidator
from users.models import CustomUser
from devices.models import Device, Measure


class DeviceModelForm(forms.ModelForm):
    class Meta:
        model = Device
        # fields = "__all__"
        fields = ["user", "name", "capacity", "place", "is_active", "measurement_range"]

        widgets = {
            "user": forms.TextInput(
                attrs={
                    "readonly": "true",
                    "disabled": "true",
                    "class": "form-control",
                    "value": CustomUser(Device.user).get_username(),
                }
            ),
            "name": forms.TextInput(attrs={"class": "form-control"}),
            "capacity": forms.NumberInput(
                attrs={
                    "class": "form-control",
                    "min": "0",
                }
            ),
            "place": forms.TextInput(
                attrs={
                    "class": "form-control",
                }
            ),
            "is_active": forms.CheckboxInput(
                attrs={
                    "class": "form-control",
                }
            ),
            "measurement_range": forms.NumberInput(
                attrs={
                    "class": "form-control",
                }
            ),
        }

    # def __init__ (self, *args, **kwargs):
    #   self.fields['name'].widget.attrs['readonly'] = True


class MeasureModelForm(forms.ModelForm):
    class Meta:
        model = Measure
        fields = "__all__"
