import math

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from .models import *

from .serializers import *

from .paginations import *


class Persona_APIView(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def get(self, request, format=None, *args, **kwargs):
		persona = Persona.objects.all()
		serializer = PersonaSerializer(persona, many=True)
		return Response({"ok": True, "payload": serializer.data})

	def post(self, request, format=None):
		serializer = PersonaSerializer(data=request.data)
		if not serializer.is_valid():
			return Response({"ok": False, "errors": serializer.errors})
		serializer.save()
		return Response({"ok": True, "payload": serializer.data})

class Persona_APIView_Detail(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def get_object(self, pk):
		try:
			return Persona.objects.get(id=pk)
		except Persona.DoesNotExist:
			return None

	def get(self, request, pk, format=None):
		persona = self.get_object(pk)
		if persona == None:
			return Response({"ok": False, "errors": "No se encontró una persona con ese ID en base de datos"})
		serializer = PersonaSerializer(persona)
		return Response({"ok": True, "payload": serializer.data})

	def put(self, request, pk, format=None):
		persona = self.get_object(pk)
		if persona == None:
			return Response({"ok": False, "errors": "No se encontró una persona con ese ID en base de datos"})
		persona.imagen.delete()
		serializer = PersonaSerializer(persona, data=request.data)
		if not serializer.is_valid():
			return Response({"ok": False, "errors": serializer.errors})
		serializer.save()
		return Response({"ok": True, "payload": serializer.data})

	def delete(self, request, pk, format=None):
		persona = self.get_object(pk)
		if persona == None:
			return Response({"ok": False, "errors": "No se encontró una persona con ese ID en base de datos"})
		persona.delete()
		return Response({"ok": True, "payload": "Persona borrada satisfactoriamente, id: {}".format(pk)})



class Objeto_APIView(APIView, CustomPaginationObjetos):
	parser_classes = (MultiPartParser, FormParser)
	def get(self, request, format=None, *args, **kwargs):
		nombre = self.request.query_params.get('nombre', None)
		descripcion = self.request.query_params.get('descripcion', None)
		familia = self.request.query_params.get('familia', None)
		categoria = self.request.query_params.get('categoria', None)
		subcategoria = self.request.query_params.get('subcategoria', None)
		numero_serie = self.request.query_params.get('numero_serie', None)
		estado_en_almacen = self.request.query_params.get('estado_en_almacen', None)
		fecha_registrado_desde = self.request.query_params.get('fecha_registrado_desde', None)
		fecha_registrado_hasta = self.request.query_params.get('fecha_registrado_hasta', None)
		localizacion = self.request.query_params.get('localizacion', None)
		fecha_ultima_accion_desde = self.request.query_params.get('fecha_ultima_accion_desde', None)
		fecha_ultima_accion_hasta = self.request.query_params.get('fecha_ultima_accion_hasta', None)
		codigo_rfid = self.request.query_params.get('codigo_rfid', None)
		estado_objeto = self.request.query_params.get('estado_objeto', None)

		queryset = Objeto.objects.all()

		if nombre is not None:
			queryset = queryset & Objeto.objects.filter(nombre__icontains=nombre)
		if descripcion is not None:
			queryset = queryset & Objeto.objects.filter(descripcion__icontains=descripcion)
		if familia is not None:
			queryset = queryset & Objeto.objects.filter(familia__icontains=familia)
		if categoria is not None:
			queryset = queryset & Objeto.objects.filter(categoria__icontains=categoria)
		if subcategoria is not None:
			queryset = queryset & Objeto.objects.filter(subcategoria__icontains=subcategoria)
		if numero_serie is not None:
			queryset = queryset & Objeto.objects.filter(numero_serie__icontains=numero_serie)
		if estado_en_almacen is not None:
			queryset = queryset & Objeto.objects.filter(estado_en_almacen=estado_en_almacen)
		if fecha_registrado_desde is not None:
			queryset = queryset & Objeto.objects.filter(fecha_alta__gte=fecha_registrado_desde)
		if fecha_registrado_hasta is not None:
			queryset = queryset & Objeto.objects.filter(fecha_alta__lte=fecha_registrado_hasta)
		if localizacion is not None:
			queryset = queryset & Objeto.objects.filter(localizacion__icontains=localizacion)
		if fecha_ultima_accion_desde is not None:
			queryset = queryset & Objeto.objects.filter(fecha_ultima_accion__gte=fecha_ultima_accion_desde)
		if fecha_ultima_accion_hasta is not None:
			queryset = queryset & Objeto.objects.filter(fecha_ultima_accion__lte=fecha_ultima_accion_hasta)
		if codigo_rfid is not None:
			queryset = queryset & Objeto.objects.filter(codigo_rfid__icontains=codigo_rfid)
		if estado_objeto is not None:
			queryset = queryset & Objeto.objects.filter(estado_objeto=estado_objeto)

		queryset = queryset.order_by('-fecha_alta')
		queryset = self.paginate_queryset(queryset, request, view=self)
		serializer = ObjetoSerializer(queryset, many=True, context={'request':request})

		return self.get_paginated_response({"ok": True, "payload": serializer.data, "tamano_pagina": self.get_page_size(request), "total_paginas": (math.ceil(self.page.paginator.count / self.get_page_size(request))), "total_objetos": self.page.paginator.count}, request)

	def post(self, request, format=None):
		try:
			request.data._mutable = True
			propietario = Persona.objects.get(codigo_rfid=request.data["propietario"])
			propietario_serializer = PersonaSerializer(propietario)
			request.data["propietario"] = propietario_serializer.data["id"]
		except Persona.DoesNotExist:
			return Response({"ok": False, "errors": "No se encontró una persona con ese Código RFID en base de datos. No se encontró al propietario."})
		serializer = PostObjetoSerializer(data=request.data)
		if not serializer.is_valid():
			return Response({"ok": False, "errors": serializer.errors})
		serializer.save()
		return Response({"ok": True, "payload": serializer.data})

class Objeto_APIView_Detail(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def get_object(self, pk):
		try:
			return Objeto.objects.get(id=pk)
		except Objeto.DoesNotExist:
			return None

	def get(self, request, pk, format=None):
		objeto = self.get_object(pk)
		if objeto == None:
			return Response({"ok": False, "errors": "No se encontró un objeto con ese ID en base de datos"})
		serializer = ObjetoSerializer(objeto)
		return Response({"ok": True, "payload": serializer.data})

	def put(self, request, pk, format=None):
		objeto = self.get_object(pk)
		if objeto == None:
			return Response({"ok": False, "errors": "No se encontró un objeto con ese ID en base de datos"})
		serializer = PostObjetoSerializer(objeto, data=request.data)
		if not serializer.is_valid():
			return Response({"ok": False, "errors": serializer.errors})
		serializer.save()
		return Response({"ok": True, "payload": serializer.data})

	def delete(self, request, pk, format=None):
		objeto = self.get_object(pk)
		if objeto == None:
			return Response({"ok": False, "errors": "No se encontró una objeto con ese ID en base de datos"})
		objeto.delete()
		return Response({"ok": True, "payload": "Objeto borrado satisfactoriamente, id: {}".format(pk)})


class Accion_APIView(APIView, CustomPaginationAcciones):
	parser_classes = (MultiPartParser, FormParser)
	def get(self, request, format=None, *args, **kwargs):
		tipo = self.request.query_params.get('tipo', None)
		nombre_objeto = self.request.query_params.get('nombre_objeto', None)
		nombre_persona = self.request.query_params.get('nombre_persona', None)
		fecha_desde = self.request.query_params.get('fecha_desde', None)
		fecha_hasta = self.request.query_params.get('fecha_hasta', None)

		queryset = Accion.objects.all()

		if tipo is not None:
			queryset = queryset & Accion.objects.filter(tipo__icontains=tipo)
		if nombre_objeto is not None:
			queryset = queryset & Accion.objects.filter(objeto__nombre__icontains=nombre_objeto)
		if nombre_persona is not None:
			queryset = queryset & Accion.objects.filter(persona__nombre__icontains=nombre_persona)
		if fecha_desde is not None:
			queryset = queryset & Accion.objects.filter(fecha__gte=fecha_desde)
		if fecha_hasta is not None:
			queryset = queryset & Accion.objects.filter(fecha__lte=fecha_hasta)

		queryset = queryset.order_by('-fecha')
		queryset = self.paginate_queryset(queryset, request, view=self)
		serializer = AccionSerializer(queryset, many=True, context={'request':request})

		return self.get_paginated_response({"ok": True, "payload": serializer.data, "tamano_pagina": self.get_page_size(request), "total_paginas": (math.ceil(self.page.paginator.count / self.get_page_size(request))), "total_objetos": self.page.paginator.count}, request)

	def post(self, request, format=None):
		serializer = PostAccionSerializer(data=request.data)
		if not serializer.is_valid():
			return Response({"ok": False, "errors": serializer.errors})
		serializer.save()
		return Response({"ok": True, "payload": serializer.data})

class Accion_APIView_Detail(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def get_object(self, pk):
		try:
			return Accion.objects.get(id=pk)
		except Accion.DoesNotExist:
			return None

	def get(self, request, pk, format=None):
		accion = self.get_object(pk)
		if accion == None:
			return Response({"ok": False, "errors": "No se encontró una accion con ese ID en base de datos"})
		serializer = AccionSerializer(accion)
		return Response({"ok": True, "payload": serializer.data})

	def put(self, request, pk, format=None):
		accion = self.get_object(pk)
		if accion == None:
			return Response({"ok": False, "errors": "No se encontró una accion con ese ID en base de datos"})
		serializer = PostAccionSerializer(accion, data=request.data)
		if not serializer.is_valid():
			return Response({"ok": False, "errors": serializer.errors})
		serializer.save()
		return Response({"ok": True, "payload": serializer.data})

	def delete(self, request, pk, format=None):
		accion = self.get_object(pk)
		if accion == None:
			return Response({"ok": False, "errors": "No se encontró una accion con ese ID en base de datos"})
		accion.delete()
		return Response({"ok": True, "payload": "Accion borrada satisfactoriamente, id: {}".format(pk)})


class Detector_APIView(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def get(self, request, format=None, *args, **kwargs):
		detector = Detector.objects.all()
		serializer = DetectorSerializer(detector, many=True)
		return Response({"ok": True, "payload": serializer.data})

	def post(self, request, format=None):
		serializer = DetectorSerializer(data=request.data)
		if not serializer.is_valid():
			return Response({"ok": False, "errors": serializer.errors})
		serializer.save()
		return Response({"ok": True, "payload": serializer.data})

class Detector_APIView_Detail(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def get_object(self, pk):
		try:
			return Detector.objects.get(id=pk)
		except Detector.DoesNotExist:
			return None

	def get(self, request, pk, format=None):
		detector = self.get_object(pk)
		if detector == None:
			return Response({"ok": False, "errors": "No se encontró un detector con ese ID en base de datos"})
		serializer = DetectorSerializer(detector)
		return Response({"ok": True, "payload": serializer.data})

	def put(self, request, pk, format=None):
		detector = self.get_object(pk)
		if detector == None:
			return Response({"ok": False, "errors": "No se encontró un detector con ese ID en base de datos"})
		serializer = DetectorSerializer(detector, data=request.data)
		if not serializer.is_valid():
			return Response({"ok": False, "errors": serializer.errors})
		serializer.save()
		return Response({"ok": True, "payload": serializer.data})

	def delete(self, request, pk, format=None):
		detector = self.get_object(pk)
		if detector == None:
			return Response({"ok": False, "errors": "No se encontró un detector con ese ID en base de datos"})
		detector.delete()
		return Response({"ok": True, "payload": "Detector borrado satisfactoriamente, id: {}".format(pk)})


class PersonaPorFecha(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def get(self, request, format=None):
		fecha_registro = self.request.query_params.get('fecha', None)
		print(fecha_registro)
		tupapi = self.request.query_params.get('tupapi', None)
		print(tupapi)
		queryset = Persona.objects.filter(fecha_registro__gt=fecha_registro)
		serializer = PersonaSerializer(queryset, many=True)

		return Response(serializer.data)


class MisObjetos(APIView, CustomPaginationObjetos):
	parser_classes = (MultiPartParser, FormParser)
	def get(self, request, fk, format=None):
		soy_propietario = self.request.query_params.get('soy_propietario', None)
		soy_responsable = self.request.query_params.get('soy_responsable', None)
		nombre = self.request.query_params.get('nombre', None)
		descripcion = self.request.query_params.get('descripcion', None)
		familia = self.request.query_params.get('familia', None)
		categoria = self.request.query_params.get('categoria', None)
		subcategoria = self.request.query_params.get('subcategoria', None)
		numero_serie = self.request.query_params.get('numero_serie', None)
		estado_en_almacen = self.request.query_params.get('estado_en_almacen', None)
		fecha_registrado_desde = self.request.query_params.get('fecha_registrado_desde', None)
		fecha_registrado_hasta = self.request.query_params.get('fecha_registrado_hasta', None)
		localizacion = self.request.query_params.get('localizacion', None)
		fecha_ultima_accion_desde = self.request.query_params.get('fecha_ultima_accion_desde', None)
		fecha_ultima_accion_hasta = self.request.query_params.get('fecha_ultima_accion_hasta', None)
		codigo_rfid = self.request.query_params.get('codigo_rfid', None)
		estado_objeto = self.request.query_params.get('estado_objeto', None)

		if soy_propietario is not None and soy_responsable is None:
			queryset = Objeto.objects.filter(propietario=fk)
		elif soy_propietario is None and soy_responsable is not None:
			queryset = Objeto.objects.filter(responsable=fk)
		else:
			queryset = Objeto.objects.filter(propietario=fk) | Objeto.objects.filter(responsable=fk)

		if nombre is not None:
			queryset = queryset & Objeto.objects.filter(nombre__icontains=nombre)
		if descripcion is not None:
			queryset = queryset & Objeto.objects.filter(descripcion__icontains=descripcion)
		if familia is not None:
			queryset = queryset & Objeto.objects.filter(familia__icontains=familia)
		if categoria is not None:
			queryset = queryset & Objeto.objects.filter(categoria__icontains=categoria)
		if subcategoria is not None:
			queryset = queryset & Objeto.objects.filter(subcategoria__icontains=subcategoria)
		if numero_serie is not None:
			queryset = queryset & Objeto.objects.filter(numero_serie__icontains=numero_serie)
		if estado_en_almacen is not None:
			queryset = queryset & Objeto.objects.filter(estado_en_almacen=estado_en_almacen)
		if fecha_registrado_desde is not None:
			queryset = queryset & Objeto.objects.filter(fecha_alta__gte=fecha_registrado_desde)
		if fecha_registrado_hasta is not None:
			queryset = queryset & Objeto.objects.filter(fecha_alta__lte=fecha_registrado_hasta)
		if localizacion is not None:
			queryset = queryset & Objeto.objects.filter(localizacion__icontains=localizacion)
		if fecha_ultima_accion_desde is not None:
			queryset = queryset & Objeto.objects.filter(fecha_ultima_accion__gte=fecha_ultima_accion_desde)
		if fecha_ultima_accion_hasta is not None:
			queryset = queryset & Objeto.objects.filter(fecha_ultima_accion__lte=fecha_ultima_accion_hasta)
		if codigo_rfid is not None:
			queryset = queryset & Objeto.objects.filter(codigo_rfid__icontains=codigo_rfid)
		if estado_objeto is not None:
			queryset = queryset & Objeto.objects.filter(estado_objeto=estado_objeto)

		queryset = queryset.order_by('-fecha_alta')
		queryset = self.paginate_queryset(queryset, request, view=self)
		serializer = ObjetoSerializer(queryset, many=True, context={'request':request})

		return self.get_paginated_response({"ok": True, "payload": serializer.data, "tamano_pagina": self.get_page_size(request), "total_paginas": (math.ceil(self.page.paginator.count / self.get_page_size(request))), "total_objetos": self.page.paginator.count}, request)
