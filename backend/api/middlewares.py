from rest_framework.response import Response

from .models import *


class SesionPermisosMiddleware():

    def sesion_valida(self, request):
        try:
            Sesion.objects.get(id=request.headers["Sesion-Token"])
            return True
        except:
            return False
        
    def sesion_valida_y_rol_profesor_y_alta_confirmada(self, request):
        try:
            sesion = Sesion.objects.get(id=request.headers["Sesion-Token"])
            if sesion.persona.rol == "profesor" and sesion.persona.alta_confirmada == True:
                return True
            else:
                return False
        except:
            return False
