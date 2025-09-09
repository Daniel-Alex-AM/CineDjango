from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
import json
# Create your views here.

def listarsala(request):
    return render(request, "sala/sala.html", None)
   
def listarsalajson(request):
    osql = SQL()
    listasalas = osql.listarJSONWeb("exec listarSala")
    return HttpResponse(listasalas)


def filtrosala(request):
    osql = SQL()
    idcine = request.GET.get("idcine")
    listasala = osql.listarJSONWeb("exec filtrarSalaNombre '{}'".format(idcine))
    return HttpResponse(listasala)

def recuperarsalajson(request):
    osql = SQL()
    idsala = request.GET.get("idsala")
    listasala = osql.listarJSONWeb("exec recuperarSala '{}'".format(idsala))
    return HttpResponse(listasala)

def guardarsala(request):
    osql = SQL()
    obj = json.loads(request.body.decode("utf-8")) #json loads convierte a diccionario
    idsala = obj["idsala"]
    nombresala = obj["nombresala"]
    numcolumnas = obj["numcolumnas"]
    numfilas = obj["numfilas"]
    idcine = obj["idcine"]

    numregistrosafectados = osql.enviarPost("exec guardarSala '{}', '{}', '{}', '{}', '{}'".format(idsala, idcine, numfilas, numcolumnas, nombresala))
    return HttpResponse(numregistrosafectados)

def eliminarsala(request):
    osql = SQL()
    idsala = request.GET.get("idsala")
    resp = osql.enviarPost("exec eliminarSala '{}'".format(idsala))

    return HttpResponse(resp)