from django.core.validators import MinValueValidator
from django.db import models


# Create your models here.
class Device(models.Model):
    name = models.CharField(verbose_name="Name", max_length=50, unique=True, blank=False)
    capacity = models.IntegerField(verbose_name="Capacity", blank=False, 
        validators=MinValueValidator(0, "O valor deve ser maior que 0."))
    place = models.CharField(verbose_name="Place", max_length=100)

    def __str__(self):
        return self.name
