from django.urls import path, include

from .api import *



urlpatterns = [
	path('api/persona', Persona_APIView.as_view()),
	path('api/persona/<str:pk>', Persona_APIView_Detail.as_view()),
	path('api/objeto', Objeto_APIView.as_view()),
	path('api/objeto/<str:pk>', Objeto_APIView_Detail.as_view()),
	path('api/accion', Accion_APIView.as_view()),
	path('api/accion/<str:pk>', Accion_APIView_Detail.as_view()),
	path('api/detector', Detector_APIView.as_view()),
	path('api/detector/<str:pk>', Detector_APIView_Detail.as_view()),
    path('api/sesion', Sesion_APIView.as_view()),
	path('api/sesion/<str:pk>', Sesion_APIView_Detail.as_view()),
	path('api/objeto/clonar/<str:pk>', ClonarObjeto.as_view()),
	path('api/misObjetos/<str:fk>', MisObjetos.as_view()),
    path('api/login', Login.as_view()),
]
