import time

from django.core.management.base import BaseCommand, CommandError
from api.models import *


class Command(BaseCommand):
    help = 'Comando para el Detector de códigos RFID de la aplicación'

    def handle(self, *args, **options):

        # Array que almacenará los códigos RFID que lleguen por parte del driver del detector
        # (o su simulación lanzada a base de datos)
        batch_codigos_rfid = []
               
        while True:
            
            queryset_solicitud_registro = SolicitudRegistro.objects.all()
            solicitud_registro = [entry for entry in queryset_solicitud_registro]

            if len(solicitud_registro) > 0:
                if solicitud_registro[0].tipo == 'persona':
                    persona_a_registrar = solicitud_registro[0].persona
                    rfid_de_la_persona = LanzaCodigoRfid.objects.all()
                    rfid_de_la_persona = [entry.codigo for entry in rfid_de_la_persona]
                    print(rfid_de_la_persona)
                    if len(rfid_de_la_persona) > 0:
                        Persona.objects.filter(pk=persona_a_registrar.id).update(codigo_rfid=rfid_de_la_persona[0])
                        queryset_solicitud_registro.delete()

                if solicitud_registro[0].tipo == 'objeto':
                    print('Objeto!')
            else:
                print('No hay solicitudes de registro')
            
            time.sleep(2)  # espera 5 sg para volver a leer los valores desde Arduino
