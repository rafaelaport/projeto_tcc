from django.core.validators import (
    MinValueValidator,
    StepValueValidator,
    MaxValueValidator,
)
from django.db import models
from users.models import CustomUser
import random


# Create your models here.
class Device(models.Model):
    default_measurement_number = 15

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        verbose_name="Nome do Proprietário",
    )
    name = models.CharField(
        verbose_name="Descrição do aparelho",
        max_length=50,
        unique=True,
        blank=False,
    )
    capacity = models.IntegerField(
        verbose_name="Capacidade do reservatório (L)",
        blank=False,
        validators=[MinValueValidator(0, "O valor deve ser maior que 0.")],
    )
    place = models.CharField(verbose_name="Localização do aparelho", max_length=100)
    is_active = models.BooleanField(verbose_name="Ativo?", null=False)
    measurement_range = models.IntegerField(
        verbose_name="Intervalo de medicão",
        validators=[
            StepValueValidator(1, "O número informado não é valido."),
            MinValueValidator(1, "A quantidade mínima para medição diária é 1."),
            MaxValueValidator(5, "A quantidade máxima para medição diária é de 5."),
        ],
        blank=True,
    )

    def __str__(self):
        return self.name


class Measure(models.Model):
    # Fields
    #
    user = models.ForeignKey(
        to=CustomUser,
        on_delete=models.PROTECT,
        verbose_name="Proprietário",
    )
    device = models.ForeignKey(
        to=Device,
        on_delete=models.PROTECT,
        verbose_name="Aparelho",
    )
    capacity = models.FloatField(
        verbose_name="Capacidade do reservatório (L)",
        blank=True,
    )
    ph = models.FloatField(verbose_name="pH", blank=True)
    quantity_substance = models.IntegerField(
        verbose_name="Quantidade de substancia (ml)",
        blank=True,
    )
    substance_type = models.CharField(
        verbose_name="Tipo de substancia",
        max_length=15,
        blank=True,
    )
    created_date = models.DateTimeField(
        verbose_name="Data da medição", auto_now_add=True
    )

    def __str__(self):
        return f"Medição {self.id}, do aparelho {self.device}."

    def save(self, *args, **kwargs):
        if self.user and self.device:
            ph = MeasureCalcs.measurement_ph()
            capacity = self.capacity
            self.ph = ph
            self.quantity_substance = MeasureCalcs.measurement_substance(ph, capacity)
            self.substance_type = MeasureCalcs.substance_type_name(ph)
            super().save(*args, **kwargs)
        else:
            super().save(*args, **kwargs)


class MeasureCalcs:
    def measurement_ph():
        # para gerar um valor aleatório para o pH, pois, o senso não está conectado
        ph = float(random.randint(0, 14))
        return ph

    def measurement_substance(ph, capacity):
        capacity = capacity / 1000.0

        if ph >= 7.3 and ph <= 8:
            quantity_substance = 13 * capacity
        elif ph > 8:
            quantity_substance = 25 * capacity
        elif ph >= 6.8 and ph <= 7:
            quantity_substance = 15 * capacity
        elif ph < 6.8:
            quantity_substance = 20 * capacity

        return quantity_substance

    def substance_type_name(ph):
        substances_types = {
            "elevator": {"description": "Elevador (ml)"},
            "reducer": {"description": "Redutor (ml)"},
        }

        if (ph >= 7.3 and ph <= 8) | (ph > 8):
            return substances_types["reducer"]["description"]
        elif (ph >= 6.8 and ph <= 7) | (ph < 6.8):
            return substances_types["elevator"]["description"]
