from django import forms
# from django.core.validators import MinValueValidator
# from users.models import CustomUser
from .models import Device


class DeviceModelForm(forms.ModelForm):

    class Meta:
        model = Device
        # fields = "__all__"
        fields = [
                "user",
                "name",
                "capacity",
                "place",
                "is_active"
                ]

    def __init__ (self, *args, **kwargs):
        self.fields['name'].widget.attrs['readonly'] = True
