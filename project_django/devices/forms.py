from django import forms
from django.core.validators import MinValueValidator
from users.models import CustomUser
from .models import Device


class DeviceModelForm(forms.ModelForm):
    class Meta:
        model = Device
        # fields = "__all__"

    user = forms.ModelChoiceField(
        queryset=CustomUser.get_full_name,
        to_field_name="user",
        required=True,
        widget=forms.Select(attrs={
            'class': 'form-control',
            'aria-label':'Dono do Aparelho'
            }),
    )
    name = forms.CharField(max_length=50)
    capacity = forms.IntegerField(validators=[MinValueValidator(0, "O valor deve ser maior que 0.")])
    place = forms.CharField(max_length=100)
