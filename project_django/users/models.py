from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


# Create your models here.
class ManagerUser(BaseUserManager):
  use_in_migrations = True
  
  def _create_user(self, email, password, **extra_fields):
    if not email:
      raise ValueError('O e-mail é obrigatório')
    
    email = self.normalize_email(email)
    user = self.model(email=email, username=email, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    return user
  
  
  def create_user(self, email, password=None, **extra_fields):
    extra_fields.setdefault('is_staff', False)
    extra_fields.setdefault('is_superuser', False)
    extra_fields.setdefault('is_active', False)
    return self._create_user(email, password, **extra_fields)
  
  
  def create_superuser(self, email, password, **extra_fields):
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    extra_fields.setdefault('is_active', True)
    
    if extra_fields.get('is_superuser') is not True:
      raise ValueError('O administrador precisa ter a propriedade "is_superuser" marcada')
    
    if extra_fields.get('is_staff') is not True:
      raise ValueError('O administrador precisa ter a propriedade "is_staff" marcada')
    
    
    return self._create_user(email, password, **extra_fields)
  
  
class CustomUser(AbstractUser):
  email =  models.EmailField('E-mail', unique=True)
  cpf_cnpj =  models.EmailField('CPF/CNPJ', unique=True)
  phone = models.CharField('Telefone', max_length=15)
  
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['first_name', 'last_name', 'phone', 'cpf_cnpj']
  
  
  def __str__(self):
    return self.email
  
  
  objects = ManagerUser()
