from django.core.validators import MinValueValidator,StepValueValidator 
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
            verbose_name="Capacidade do aparelho (L)", 
            blank=False,
            validators=[MinValueValidator(0, "O valor deve ser maior que 0.")]
            )
    place = models.CharField(
            verbose_name="Localização do aparelho", 
            max_length=100
            )
    is_active = models.BooleanField(
            verbose_name="Ativo?", 
            null=False
            )
    measurement_range = models.IntegerField(
            verbose_name="Intervalo de medicão",
            validators=[StepValueValidator(15, "O número informado não é valido.")],
            blank=True,
            )

    def __str__(self):
        return self.name

    def measurement_ph (self):
        # para gerar um valor aleatório para o pH, pois, o senso não está conectado
        ph = float(random(0, 14))
        return ph
    
    def measurement_substance (self):
        ph = self.measurement_ph
        # para obter a capacidade em metros cúbicos será necessário dividir por 1000
        capacity = float(self.capacity) / 1000
        
        if ph >= 7.3 & ph <= 8:
            quantity_substance = 13 * capacity
        elif ph > 8:
            quantity_substance = 25 * capacity
        elif ph >= 6.8 & ph <= 7:
            quantity_substance = 15 * capacity
        elif ph < 6.8:
            quantity_substance = 20 * capacity
            
        return quantity_substance