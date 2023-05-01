import math
import hashlib

from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from .models import *

from .serializers import *

from .paginations import *

from .middlewares import *

# TODO: Meter comprobaciones de los parámetros por código para customizar las respuestas de error

class Persona_APIView(APIView, CustomPaginationObjetos):
	parser_classes = (MultiPartParser, FormParser)
	def get(self, request, format=None, *args, **kwargs):
		alta = self.request.query_params.get('alta', None)

		persona = Persona.objects.all()

		if alta is not None and alta.__eq__("true"):
			persona = persona & Persona.objects.filter(alta_confirmada=True)
		if alta is not None and alta.__eq__("false"):
			persona = persona & Persona.objects.filter(alta_confirmada=False)

		persona = persona.order_by('-fecha_registro')
		persona = self.paginate_queryset(persona, request, view=self)
		serializer = PersonaGetSerializer(persona, many=True)

		return self.get_paginated_response({"ok": True, "payload": serializer.data, "tamano_pagina": self.get_page_size(request), "total_paginas": (math.ceil(self.page.paginator.count / self.get_page_size(request))), "total_objetos": self.page.paginator.count}, request)

	def post(self, request, format=None):
		request.data._mutable = True
		request.data["password"] = hashlib.sha256(str(request.data["password"]).encode("utf-8")).hexdigest()
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
		serializer = PersonaGetSerializer(persona)
		return Response({"ok": True, "payload": serializer.data})

	def put(self, request, pk, format=None):
		persona = self.get_object(pk)
		if persona == None:
			return Response({"ok": False, "errors": "No se encontró una persona con ese ID en base de datos"})
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
		if codigo_rfid is not None and codigo_rfid != "":
			queryset = queryset & Objeto.objects.filter(codigo_rfid__icontains=codigo_rfid)
		if codigo_rfid is not None and codigo_rfid == "":
			queryset = queryset & Objeto.objects.filter(codigo_rfid__isnull=True)
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


class Detector_APIView(APIView, SesionPermisosMiddleware):
	parser_classes = (MultiPartParser, FormParser)
	def get(self, request, format=None, *args, **kwargs):
		# if not self.sesion_valida(request): return Response({"ok": False, "errors": "Lo sentimos. No puede realizar esta acción porque su sesión ha expirado"})
		# if not self.rol_profesor_y_alta_confirmada(request): return Response({"ok": False, "errors": "Necesita tener su sesión iniciada, rol de profesor y estar dado de alta en la aplicación para realizar esta acción"})
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


class ClonarObjeto(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def post(self, request, pk, format=None):
		objeto_a_clonar = Objeto.objects.get(id=pk)
		objeto_a_clonar.pk = None
		objeto_a_clonar.codigo_rfid = None
		objeto_a_clonar.fecha_alta = timezone.now()
		objeto_a_clonar.save()
		return Response({"ok": True, "payload": "Objeto con id {} clonado satisfactoriamente".format(pk)})


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
		if codigo_rfid is not None and codigo_rfid != "":
			queryset = queryset & Objeto.objects.filter(codigo_rfid__icontains=codigo_rfid)
		if codigo_rfid is not None and codigo_rfid == "":
			queryset = queryset & Objeto.objects.filter(codigo_rfid__isnull=True)
		if estado_objeto is not None:
			queryset = queryset & Objeto.objects.filter(estado_objeto=estado_objeto)

		queryset = queryset.order_by('-fecha_alta')
		queryset = self.paginate_queryset(queryset, request, view=self)
		serializer = ObjetoSerializer(queryset, many=True, context={'request':request})

		return self.get_paginated_response({"ok": True, "payload": serializer.data, "tamano_pagina": self.get_page_size(request), "total_paginas": (math.ceil(self.page.paginator.count / self.get_page_size(request))), "total_objetos": self.page.paginator.count}, request)


class Sesion_APIView(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def get(self, request, format=None, *args, **kwargs):
		sesion = Sesion.objects.all()
		serializer = SesionSerializer(sesion, many=True)
		return Response({"ok": True, "payload": serializer.data})

	def post(self, request, format=None):
		try:
			sesion = Sesion.objects.get(persona=request.data["persona"])
			sesion.delete()
		except Sesion.DoesNotExist:
			pass
		serializer = PostSesionSerializer(data=request.data)
		if not serializer.is_valid():
			return Response({"ok": False, "errors": serializer.errors})
		serializer.save()
		return Response({"ok": True, "payload": serializer.data})

class Sesion_APIView_Detail(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def get_object(self, pk):
		try:
			return Sesion.objects.get(id=pk)
		except Sesion.DoesNotExist:
			return None

	def get(self, request, pk, format=None):
		sesion = self.get_object(pk)
		if sesion == None:
			return Response({"ok": False, "errors": "No se encontró una sesión con ese ID en base de datos"})
		serializer = SesionSerializer(sesion)
		return Response({"ok": True, "payload": serializer.data})

	def delete(self, request, pk, format=None):
		sesion = self.get_object(pk)
		if sesion == None:
			return Response({"ok": False, "errors": "No se encontró una sesión con ese ID en base de datos"})
		sesion.delete()
		return Response({"ok": True, "payload": "Sesión borrada satisfactoriamente, id: {}".format(pk)})


class Login(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def post(self, request, format=None):
		try:
			request.data._mutable = True
			persona = Persona.objects.get(usuario=request.data["usuario"], password=request.data["password"])
			if (persona.alta_confirmada != True): return Response({"ok": False, "errors": "Una persona con rol de Profesor debe dar de alta tu cuenta antes de poder loguearte en la aplicación"})
			request.data["persona"] = persona.id
			request.data["usuario"] = None
			request.data["password"] = None
			try:
				sesion = Sesion.objects.get(persona=request.data["persona"])
				sesion.delete()
			except Sesion.DoesNotExist:
				pass
			serializer = PostSesionSerializer(data=request.data)
			if not serializer.is_valid():
				return Response({"ok": False, "errors": serializer.errors})
			serializer.save()
			return Response({"ok": True, "token": serializer.data["id"], "user_id": serializer.data["persona"]})
		except Persona.DoesNotExist:
			return Response({"ok": False, "errors": "No se encontró una persona con ese usuario o esa contraseña en base de datos"})


class SolicitudRegistro_APIView(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def get(self, request, format=None, *args, **kwargs):
		solicitud_registro = SolicitudRegistro.objects.all()
		solicitud_registro.order_by('fecha')
		serializer = SolicitudRegistroSerializer(solicitud_registro, many=True)
		return Response({"ok": True, "payload": serializer.data})

	def post(self, request, format=None):
		serializer = PostSolicitudRegistroSerializer(data=request.data)
		if not serializer.is_valid():
			return Response({"ok": False, "errors": serializer.errors})
		serializer.save()
		return Response({"ok": True, "payload": serializer.data})

class SolicitudRegistro_APIView_Detail(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def get_object(self, pk):
		try:
			return SolicitudRegistro.objects.get(id=pk)
		except SolicitudRegistro.DoesNotExist:
			return None

	def get(self, request, pk, format=None):
		solicitud_registro = self.get_object(pk)
		if solicitud_registro == None:
			return Response({"ok": False, "errors": "No se encontró una solicitud de registro con ese ID en base de datos"})
		serializer = SolicitudRegistroSerializer(solicitud_registro)
		return Response({"ok": True, "payload": serializer.data})

	def delete(self, request, pk, format=None):
		solicitud_registro = self.get_object(pk)
		if solicitud_registro == None:
			return Response({"ok": False, "errors": "No se encontró una solicitud de registro con ese ID en base de datos"})
		solicitud_registro.delete()
		return Response({"ok": True, "payload": "Solicitud de registro borrada satisfactoriamente, id: {}".format(pk)})
	

class LanzaCodigoRfid_APIView(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def get(self, request, format=None, *args, **kwargs):
		lanza_codigo_rfid = LanzaCodigoRfid.objects.all()
		lanza_codigo_rfid.order_by('fecha')
		serializer = LanzaCodigoRfidSerializer(lanza_codigo_rfid, many=True)
		return Response({"ok": True, "payload": serializer.data})

	def post(self, request, format=None):
		serializer = LanzaCodigoRfidSerializer(data=request.data)
		if not serializer.is_valid():
			return Response({"ok": False, "errors": serializer.errors})
		serializer.save()
		return Response({"ok": True, "payload": serializer.data})

class LanzaCodigoRfid_APIView_Detail(APIView):
	parser_classes = (MultiPartParser, FormParser)
	def get_object(self, pk):
		try:
			return LanzaCodigoRfid.objects.get(id=pk)
		except LanzaCodigoRfid.DoesNotExist:
			return None

	def get(self, request, pk, format=None):
		lanza_codigo_rfid = self.get_object(pk)
		if lanza_codigo_rfid == None:
			return Response({"ok": False, "errors": "No se encontró un objeto de lanzamiento de código RFID con ese ID en base de datos"})
		serializer = LanzaCodigoRfidSerializer(lanza_codigo_rfid)
		return Response({"ok": True, "payload": serializer.data})

	def delete(self, request, pk, format=None):
		lanza_codigo_rfid = self.get_object(pk)
		if lanza_codigo_rfid == None:
			return Response({"ok": False, "errors": "No se encontró un objeto de lanzamiento de código RFID con ese ID en base de datos"})
		lanza_codigo_rfid.delete()
		return Response({"ok": True, "payload": "Objeto de lanzamiento de código RFID borrado satisfactoriamente, id: {}".format(pk)})
