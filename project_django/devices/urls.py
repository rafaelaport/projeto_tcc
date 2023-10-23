from django.urls import path
from devices.views import (
    DeviceListView,
    DeviceCreateView,
    DeviceUpdateView,
    measureCreateView,
)


app_name = "devices"

urlpatterns = [
    path("list/", DeviceListView.as_view(), name="device-list"),
    path("create/", DeviceCreateView.as_view(), name="device-create"),
    path("update/<int:pk>", DeviceUpdateView.as_view(), name="device-update"),
    path("make-measure/<int:pk_device>/", measureCreateView, name="make-measure"),
]
