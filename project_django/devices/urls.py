from django.urls import path
from .views import DeviceListView, DeviceCreateView


app_name = 'devices'

urlpatterns = [
  path('list/', DeviceListView.as_view(), name='device-list'),
  path('create/', DeviceCreateView.as_view(), name='device-create'),
]
