from devices.models import Device, Measure
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView, UpdateView


from django import forms


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
    # form_class = DeviceModelForm
    # model = DeviceModelForm
    template_name = "devices/update.html"
    fields = ["name", "capacity", "place", "is_active", "measurement_range"]
    context_object_name = "device"
    success_url = reverse_lazy("devices:device-list")


def measureCreateView(request, pk_device):
    try:
        user = request.user
        device = Device.objects.get(id=pk_device)

        ph = Measure.measurement_ph()
        quantity_substance = Measure.measurement_substance(ph, device.capacity)
        substance_type = Measure.substance_type_name(ph)

        new_measure = Measure.objects.create(
            user_id=user.id,
            device_id=pk_device,
            capacity=device.capacity,
            ph=ph,
            quantity_substance=quantity_substance,
            substance_type=substance_type,
        )
        new_measure.save()

        return HttpResponse(status=201)

    except:
        print("=> ERROR => Não foi possível criar uma medição.")
        raise ValueError("=> ERROR => Não foi possível criar uma medição.")
