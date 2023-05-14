from django import forms
from django.core.validators import MinValueValidator
from users.models import CustomUser
from .models import Device
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Div, Field, Fieldset, Layout, Submit


class DeviceModelForm(forms.ModelForm):
    class Meta:
        model = Device
        # fields = "__all__"
        fields = [
                "user",
                "name",
                "capacity",
                "place"
                ]


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = "post"
        # self.helper.form_action = "."
        self.helper.add_input( # adding a button to send form
            Submit(
                "submit",
                "Salvar",
                css_class="btn btn-success btn-lg btn-block",
            )
        )
        self.helper.layout = Layout(
            Fieldset(
                "user",
                "name",
                "capacity",
                "place",
                Div(
                    Field("user", onchange="", wrapper_class="col"),
                    css_class="form-floating mb-3",
                ),
                Div(
                    Field("name", wrapper_class="col"),
                    css_class="form-floating mb-3",
                ),
                Div(
                    Field("capacity", wrapper_class="col"),
                    css_class="form-floating mb-3",
                ),
                Div(
                    Field("place", wrapper_class="col"),
                    css_class="form-floating mb-3",
                ),
                css_class="border-bottom mb-3",
            )
        )
