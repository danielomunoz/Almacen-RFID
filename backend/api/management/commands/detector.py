import time
import uuid

from django.core.management.base import BaseCommand, CommandError
from api.models import *


class Command(BaseCommand):
    help = 'Comando para el Detector de códigos RFID de la aplicación'

    def handle(self, *args, **options):

        # Array que almacenará los códigos RFID que lleguen por parte del driver del detector
        # (o su simulación lanzada a base de datos)
        batch_codigos_rfid = []
        batch_iniciado = False
        existe_objeto_en_batch = False
        existe_persona_en_batch = False
        objetos_no_registrados_en_batch = False
        id_persona_responsable_batch = ''
        id_objetos_batch = []
        tipo_accion = ''

        id_detector = uuid.UUID('70f5436d-ab30-4e0b-9bf3-ab65cb5e13c4')

        millis = lambda: int(round(time.time() * 1000))
        millis_referencia = millis()
               
        while True:

            try:
                queryset_solicitud_registro = SolicitudRegistro.objects.all()
                solicitud_registro = [entry for entry in queryset_solicitud_registro]

                if len(solicitud_registro) > 0:
                    if solicitud_registro[0].tipo == 'persona':
                        persona_a_registrar = solicitud_registro[0].persona
                        queryset_rfid_de_la_persona = LanzaCodigoRfid.objects.all()
                        rfid_de_la_persona = [entry.codigo for entry in queryset_rfid_de_la_persona]
                        if len(rfid_de_la_persona) > 0:
                            Persona.objects.filter(pk=persona_a_registrar.id).update(codigo_rfid=rfid_de_la_persona[0])
                            queryset_solicitud_registro.delete()
                            queryset_rfid_de_la_persona.delete()
                            time.sleep(10) # Espera 10 segundos para dejar que abandones la zona de lectura

                    if solicitud_registro[0].tipo == 'objeto':
                        numero_objetos = solicitud_registro[0].batch
                        queryset_rfid_de_los_objetos = LanzaCodigoRfid.objects.all()
                        rfid_de_los_objetos = [entry.codigo for entry in queryset_rfid_de_los_objetos]
                        print(rfid_de_los_objetos)
                        if len(solicitud_registro) == numero_objetos and len(rfid_de_los_objetos) == numero_objetos:
                            for i in range(numero_objetos):
                                Objeto.objects.filter(pk=solicitud_registro[i].objeto.id).update(codigo_rfid=rfid_de_los_objetos[i])
                            queryset_rfid_de_los_objetos.delete()
                            queryset_solicitud_registro.delete()
                            time.sleep(10) # Espera 10 segundos para dejar que abandones la zona de lectura (objeto cuenta como fuera de almacén)

                else:
                    queryset_codigos_rfid = LanzaCodigoRfid.objects.all()
                    batch_codigos_rfid = [entry.codigo for entry in queryset_codigos_rfid]
                    if not batch_iniciado:
                        if len(batch_codigos_rfid) > 0:
                            print('Nuevo batch')
                            print(batch_codigos_rfid)
                            batch_iniciado = True
                            millis_actual = millis()
                            millis_referencia = millis()
                    else:
                        millis_actual = millis()
                        if (millis_actual > (millis_referencia + 10000)):
                            print('Terminó el tiempo del batch')
                            print(batch_codigos_rfid)

                            for i in range(len(batch_codigos_rfid)):
                                objetos_queryset = Objeto.objects.filter(codigo_rfid=batch_codigos_rfid[i])
                                objetos = [entry.id for entry in objetos_queryset]
                                if len(objetos) > 0:
                                    existe_objeto_en_batch = True
                                    id_objetos_batch.append(objetos[0])
                                else:
                                    persona_responsable_queryset = Persona.objects.filter(codigo_rfid=batch_codigos_rfid[i])
                                    persona_responsable = [entry.id for entry in persona_responsable_queryset]
                                    if len(persona_responsable) > 0:
                                        existe_persona_en_batch = True
                                        id_persona_responsable_batch = persona_responsable[0]
                                    else:
                                        objetos_no_registrados_en_batch = True

                            if existe_persona_en_batch == False:
                                print('No se encontró un rfid de persona en el batch')
                            if existe_objeto_en_batch == False:
                                print('No se encontró ningún rfid de objeto en el batch')
                            if objetos_no_registrados_en_batch == True:
                                print('¡Cuidado! El batch contiene objetos no registrados en Base de datos')

                            if existe_persona_en_batch and existe_objeto_en_batch:
                                # print('Batch de ids de objetos:')
                                # print(id_objetos_batch)
                                # print('Id de la persona')
                                # print(id_persona_responsable_batch)
                                for i in range(len(id_objetos_batch)):
                                    ultima_accion_sobre_el_objeto_queryset = Accion.objects.filter(objeto__id=id_objetos_batch[i]).order_by('-fecha')
                                    ultima_accion_sobre_el_objeto = [entry for entry in ultima_accion_sobre_el_objeto_queryset]
                                    if len(ultima_accion_sobre_el_objeto) == 0 or ultima_accion_sobre_el_objeto[0].tipo == 'salida':
                                        tipo_accion = 'ingreso'
                                        Objeto.objects.filter(pk=id_objetos_batch[i]).update(responsable=None, estado_en_almacen="en deposito")
                                    else:
                                        tipo_accion = 'salida'
                                        Objeto.objects.filter(pk=id_objetos_batch[i]).update(responsable=id_persona_responsable_batch, estado_en_almacen="retirado")
                                    nueva_accion = Accion(tipo=tipo_accion,
                                                        objeto=Objeto.objects.get(id=id_objetos_batch[i]),
                                                        persona=Persona.objects.get(id=id_persona_responsable_batch),
                                                        detector=Detector.objects.get(id=id_detector))
                                    nueva_accion.save()

                            # Reseteamos batch
                            queryset_codigos_rfid.delete()
                            batch_codigos_rfid = []
                            batch_iniciado = False
                            existe_objeto_en_batch = False
                            existe_persona_en_batch = False
                            objetos_no_registrados_en_batch = False
                            id_persona_responsable_batch = ''
                            id_objetos_batch = []
                            tipo_accion = ''

                time.sleep(2)

            except:
                print("Algo fue mal con el comando")
                queryset_solicitud_registro = SolicitudRegistro.objects.all()
                queryset_solicitud_registro.delete()
                queryset_codigos_rfid = LanzaCodigoRfid.objects.all()
                queryset_codigos_rfid.delete()
