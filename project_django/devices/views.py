from devices.models import Device, Measure
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView, UpdateView
from datetime import date, timedelta
from devices.forms import DeviceModelForm


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
    form_class = DeviceModelForm
    # model = DeviceModelForm
    template_name = "devices/update.html"
    # fields = ["name", "capacity", "place", "is_active", "measurement_range"]
    context_object_name = "device"
    success_url = reverse_lazy("devices:device-list")


def MeasureListView(request, pk):
    template_name = "measures/measure-list.html"

    measures_chart = Measure.objects.filter(
        user_id=request.user.id,
        device_id=pk,
        created_date__range=(
            str(date.today() - timedelta(days=15)),
            str(date.today() + timedelta(days=1)),
        ),
    ).order_by("created_date")

    measures = Measure.objects.filter(
        user_id=request.user.id,
        device_id=pk,
    ).order_by("-created_date")

    device_name = Device.objects.get(id=pk).name
    capacity = Device.objects.get(id=pk).capacity
    device_id = pk
    device_status = Device.objects.get(id=pk).is_active

    context = {
        "measures": measures,
        "device_name": device_name,
        "capacity": capacity,
        "device_id": device_id,
        "device_status": device_status,
        "measures_chart": measures_chart,
    }

    return render(request=request, template_name=template_name, context=context)


def measureCreateView(request, pk_device):
    try:
        user = request.user
        device = Device.objects.get(id=pk_device)
        template_name = "measures/measure-list.html"

        # if request.method == "POST":
        new_measure = Measure.objects.create(
            user_id=user.id,
            device_id=pk_device,
            capacity=device.capacity,
        )
        new_measure.save()

        # return render(request=request, template_name=template_name)
        # HttpResponse(status=201)
        return redirect(f"devices:measures-list", pk=pk_device)

    except:
        print("=> ERROR => Não foi possível criar uma medição.")
        raise ValueError("=> ERROR => Não foi possível criar uma medição.")


class MeasureListView(ListView):
    model = Measure
    template_name = "measures/measure-list.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["measures_chart"] = Measure.objects.filter(
            user_id=self.request.user.id,
            device_id=self.kwargs["pk"],
            created_date__range=(
                str(date.today() - timedelta(days=15)),
                str(date.today() + timedelta(days=1)),
            ),
        ).order_by("created_date")
        context["measures"] = Measure.objects.filter(
            user_id=self.request.user.id,
            device_id=self.kwargs["pk"],
        ).order_by("-created_date")
        context["device_name"] = Device.objects.get(id=self.kwargs["pk"]).name
        context["capacity"] = Device.objects.get(id=self.kwargs["pk"]).capacity
        context["device_id"] = self.kwargs["pk"]
        context["device_status"] = Device.objects.get(id=self.kwargs["pk"]).is_active
        return context
