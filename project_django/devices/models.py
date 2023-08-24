from django.core.validators import MinValueValidator
from django.db import models
from users.models import CustomUser


# Create your models here.
class Device(models.Model):
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

    def __str__(self):
        return self.name
