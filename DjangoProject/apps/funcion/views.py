from django.shortcuts import render
from django.http import HttpResponse
from webconfig.query import SQL
import json

# Create your views here.
def listarfuncion(request):
    return render(request, "funcion/funcion.html", None)

def listarjson(request):
    osql = SQL()
    lsitafunciones = osql.listarJSONWeb("exec listarFuncion")
    return HttpResponse(lsitafunciones)

def filtrar(request):
    osql = SQL()
    idpelicula = request.GET.get("idpelicula")
    listafunciones = osql.listarJSONWeb("exec filtrarFuncion '{}'".format(idpelicula))
    print(idpelicula, listafunciones)
    return HttpResponse(listafunciones)

def guardarfuncion(request):
     osql = SQL()
     obj = json.loads(request.body.decode("utf-8"))
     idfuncion = obj["idfuncion"]
     fechafunc = obj["fechaformat"]
     idpelicula = obj["idpelicula"]
     idcine = obj["idcine"]
     idsala = obj["idsala"]
     resp = osql.enviarTransaccion("SET NOCOUNT ON;exec guardarFuncion \
                                   '{}','{}','{}','{}','{}'"\
                                   .format(idfuncion, fechafunc, idpelicula, idcine, idsala))
     

     return HttpResponse(resp)

def buscarsalas(request):
    osql = SQL()
    idcine = request.GET.get("idcine")
    resp = "[]"

    if idcine != "0": #default
        resp = osql.listarJSONWeb("exec llenarSala '{}'".format(idcine))
    
    return HttpResponse(resp)
    
def recuperarfuncion(request):
    # http://localhost:8000/funcion/recuperarfuncion/?idfuncion=7
    osql = SQL()
    idfunc = request.GET.get("idfuncion")

    obj = osql.listarJSONWeb("exec recuperarFuncion '{}'".format(idfunc))

    return HttpResponse(obj)

def eliminarfuncion(request):
    osql = SQL()    
    idfunc = request.GET.get("idfuncion")
    resp = osql.enviarPost("exec eliminarFuncion '{}'".format(idfunc))

    return HttpResponse(resp)

def buscarfuncionporcine(request):
    osql = SQL()

    idcine = request.GET.get("idcine")
    lista = osql.listarJSONWeb("exec buscarFuncionPorCine '{}'".format(idcine))
    print(lista)
    return HttpResponse(lista)