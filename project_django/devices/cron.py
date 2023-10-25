from django.conf import settings
from devices.models import Device, Measure
from datetime.datetime import now


def make_measures():
    try:
        devices = Device.objects.all()

        for device in devices:
            if device.is_active:
                qtd_measures_in_the_day = Measure.objects.filter(
                    create_date__date=now(), device_id=device.id
                ).count()
                measures_per_day = device.measurement_range

                if int(qtd_measures_in_the_day) < int(measures_per_day):
                    user_id = device.user_id
                    device_id = device.id

                    new_measure = Measure.objects.create(
                        user_id=user_id,
                        device_id=device_id,
                        capacity=device.capacity,
                    )
                    new_measure.save()

    except:
        print("=> ERROR => Não foi possível criar uma medição pelo CronTab.")
        raise ValueError("=> ERROR => Não foi possível criar uma medição pelo CronTab.")
