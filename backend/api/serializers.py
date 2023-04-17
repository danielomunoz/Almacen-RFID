from rest_framework import serializers

from .models import *



class PersonaSerializer(serializers.ModelSerializer):
	imagen = serializers.ImageField(required=False)
	class Meta:
		model = Persona
		fields = ['id', 'nombre', 'email', 'movil', 'dni', 'codigo_rfid', 'imagen', 'fecha_registro', 'rol', 'estado', 'token_sesion']

	def validate_rol(self, value):
		if value not in ['alumno', 'profesor']:
			raise serializers.ValidationError('El rol sólo puede tener dos valores: [alumno, profesor]')
		return value

	def validate_estado(self, value):
		if value not in ['alta', 'baja']:
			raise serializers.ValidationError('El estado sólo puede tener dos valores: [alta, baja]')
		return value


class ObjetoSerializer(serializers.ModelSerializer):
	imagen = serializers.ImageField(required=False)
	responsable = PersonaSerializer(
					many=False,
					read_only=True
				)		
	propietario = PersonaSerializer(
					many=False,
					read_only=True
				)
	class Meta:
		model = Objeto
		fields = '__all__'


class PostObjetoSerializer(serializers.ModelSerializer):
	imagen = serializers.ImageField(required=False)
	responsable = serializers.PrimaryKeyRelatedField(
					queryset=Persona.objects.all(),
					required=False,
					allow_null=True
				)
	# Quitamos el serializer del propietario como primary key porque al crear un objeto será mejor meter el código rfid del propietario
	class Meta:
		model = Objeto
		fields = '__all__'

	def validate_estado_en_almacen(self, value):
		if value not in ['en deposito', 'retirado']:
			raise serializers.ValidationError('El estado en almacén sólo puede tener dos valores: [en deposito, retirado]')
		return value

	def validate_estado_objeto(self, value):
		if value not in ['nuevo', 'usado', 'defectuoso', 'baja']:
			raise serializers.ValidationError('El estado del objeto sólo puede tener cuatro valores: [nuevo, usado, defectuoso, baja]')
		return value

	def validate_localizacion(self, value):
		if value not in ['zona1']:
			raise serializers.ValidationError('La localización sólo puede tener como valores: [zona1]')
		return value


class DetectorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Detector
		fields = '__all__'

	def validate_localizacion(self, value):
		if value not in ['zona1']:
			raise serializers.ValidationError('La localización sólo puede tener como valores: [zona1]')
		return value


class AccionSerializer(serializers.ModelSerializer):
	persona = PersonaSerializer(
				many=False,
				read_only=True
			)
	objeto = ObjetoSerializer(
				many=False,
				read_only=True
			)
	detector = DetectorSerializer(
				many=False,
				read_only=True
			)

	class Meta:
		model = Accion
		fields = '__all__'


class PostAccionSerializer(serializers.ModelSerializer):
	persona = serializers.PrimaryKeyRelatedField(
				queryset=Persona.objects.all(),
				required=True
			)
	objeto = serializers.PrimaryKeyRelatedField(
				queryset=Objeto.objects.all(),
				required=True
			)
	detector = serializers.PrimaryKeyRelatedField(
				queryset=Detector.objects.all(),
				required=True
			)

	class Meta:
		model = Accion
		fields = '__all__'

	def validate_tipo(self, value):
		if value not in ['ingreso', 'salida']:
			raise serializers.ValidationError('El tipo sólo puede tener como valores: [ingreso, salida]')
		return value