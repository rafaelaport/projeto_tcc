from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from devices.models import Device
from users.models import CustomUser
from django.views.generic.list import ListView


# Create your views here.
class DevicesView(ListView):
    template_name = "devices/list.html"
    model = Device

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # context["devices"] = Device.objects.all()
        print("##########  ", self.request.user.id)
        return context

    def get_queryset(self):
        queryset = super(DevicesView, self).get_queryset()
        queryset = queryset.filter(user=self.request.user)
        return queryset
