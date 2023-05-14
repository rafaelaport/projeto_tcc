from devices.models import Device
from django.urls import reverse_lazy
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView, UpdateView


# Create your views here.
class DeviceCreateView(CreateView):
    model = Device
    template_name = "devices/create.html"
    fields = ["user", "name", "capacity", "place"]
    success_url = reverse_lazy("devices:device-list")


class DeviceListView(ListView):
    template_name = "devices/list.html"
    model = Device
    context_object_name = "devices"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

    def get_queryset(self):
        queryset = super(DeviceListView, self).get_queryset()
        queryset = queryset.filter(user=self.request.user)
        return queryset


class DeviceUpdateView(UpdateView):
    model = Device
    template_name = "devices/update.html"
    fields = ["user", "name", "capacity", "place"]
    success_url = reverse_lazy("devices:device-list")
