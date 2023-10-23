from devices.models import Device, Measure
from django.http import HttpResponse
from devices.forms import MeasureModelForm
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
        measure_form = MeasureModelForm(request.POST or None)

        measure_form.instance.user_id = user.id
        measure_form.instance.device_id = pk_device
        measure_form.instance.capacity = device.capacity
        measure_form.instance.ph = Measure.measurement_ph()
        measure_form.instance.quantity_substance = Measure.measurement_substance(
            measure_form.instance.ph, device.capacity
        )
        measure_form.instance.substance_type = Measure.substance_type_name(
            measure_form.instance.ph
        )

        if request.method == "POST":
            if measure_form.is_valid():
                measure_form.save()

            return HttpResponse(status=201)

    except:
        print("=> ERROR => Não foi possível criar uma medição.")
        raise ValueError("=> ERROR => Não foi possível criar uma medição.")
