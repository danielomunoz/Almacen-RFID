from django.db import models
from django.utils import timezone

import uuid
import datetime

# Create your models here.
def upload_to(instance, filename):
	now = datetime.datetime.now()
	now = str(now).replace(" ", "-").replace(":", ".").replace(".", "-")
	return 'images/{now}_{filename}'.format(now=now, filename=filename)


class Persona(models.Model):
	id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True)
	nombre = models.CharField(max_length=100, blank=True, null=False)
	email = models.CharField(max_length=50, unique=True, blank=True, null=False)
	movil = models.CharField(max_length=15, blank=True, null=False)
	dni = models.CharField(max_length=15, unique=True, blank=True, null=False)
	codigo_rfid = models.CharField(max_length=40, unique=True, blank=True, null=False)
	imagen = models.ImageField(upload_to=upload_to, blank=True, null=True)
	fecha_registro = models.DateTimeField(default=timezone.now, blank=True, null=False)
	rol = models.CharField(max_length=20, blank=True, null=False)
	usuario = models.CharField(max_length=50, unique=True, blank=True, null=False)
	password = models.CharField(max_length=50, blank=True, null=False)
	estado = models.CharField(max_length=20, blank=True, null=False)
	fecha_baja = models.DateTimeField(blank=True, null=True)
	token_sesion = models.CharField(max_length=200, blank=True, null=True)

	def __str__(self):
		return self.nombre


class Objeto(models.Model):
	id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True)
	nombre = models.CharField(max_length=100, blank=True, null=False)
	descripcion = models.CharField(max_length=200, blank=True, null=False)
	familia = models.CharField(max_length=50, blank=True, null=True)
	categoria = models.CharField(max_length=50, blank=True, null=True)
	subcategoria = models.CharField(max_length=50, blank=True, null=True)
	numero_serie = models.CharField(max_length=30, blank=True, null=True)
	estado_en_almacen = models.CharField(max_length=20, blank=True, null=False, default='en deposito')
	fecha_alta = models.DateTimeField(default=timezone.now, blank=True, null=False)
	responsable = models.ForeignKey(Persona, on_delete=models.PROTECT, related_name='responsable', blank=True, null=True)
	propietario = models.ForeignKey(Persona, on_delete=models.PROTECT, related_name='propietario', blank=True, null=False)
	localizacion = models.CharField(max_length=100, blank=True, null=False)
	fecha_ultima_accion = models.DateTimeField(blank=True, null=True)
	codigo_rfid = models.CharField(max_length=40, unique=True, blank=True, null=False)
	imagen = models.ImageField(upload_to=upload_to, blank=True, null=True)
	estado_objeto = models.CharField(max_length=20, blank=True, null=False, default='nuevo')
	fecha_baja = models.DateTimeField(blank=True, null=True)

	def __str__(self):
		return self.nombre


class Detector(models.Model):
	id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True)
	descripcion = models.CharField(max_length=200, blank=True, null=True)
	localizacion = models.CharField(max_length=100, blank=True, null=False)
	fecha_registro = models.DateTimeField(default=timezone.now, blank=True, null=False)

	def __str__(self):
		return self.id


class Accion(models.Model):
	id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True)
	tipo = models.CharField(max_length=15, blank=False, null=False)
	persona = models.ForeignKey(Persona, on_delete=models.PROTECT, related_name='persona')
	objeto = models.ForeignKey(Objeto, on_delete=models.PROTECT, related_name='objeto')
	detector = models.ForeignKey(Detector, on_delete=models.PROTECT, related_name='detector')
	fecha = models.DateTimeField(default=timezone.now, blank=True, null=False)

	def __str__(self):
		return self.id
