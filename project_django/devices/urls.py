from django.urls import path
from .views import DevicesView


app_name = 'devices'

urlpatterns = [
  path('list/', DevicesView.as_view(), name='devices-list'),
]
