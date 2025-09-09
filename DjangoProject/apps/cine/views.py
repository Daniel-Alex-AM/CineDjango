from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
import json

### EJERCICIO ASYNC
# EL metodo de vista solo regresa la pagina
# La llamada a los datos se hace en otro metodo

def listarcine(request):
    return render(request, 'cine/listar.html', {})

def listarCineAsync(request):
    osql = SQL()
    lista = osql.listarJSON("exec listarCine")
    return HttpResponse(json.dumps(lista))

def buscarCineAsync(request):
    #ASYNC
    nombre = request.GET.get("nombre")
    osql = SQL()
    lista = osql.listarJSON("exec filtrarCine '{}'".format(nombre))
    return HttpResponse(json.dumps(lista))

def guardarcine(request):
    osql = SQL()
    objeto = json.loads(request.body.decode("utf-8"))
    idcine = objeto.get("idcine")
    nombrecine = objeto.get("nombrecine")
    direccioncine = objeto.get("direccion")
    idtipocine = objeto.get("idtipocine")
    fechaapertura = objeto.get("fechaapertura")

    osql = SQL()
    numaffected = osql.enviarPost("exec guardarCine '{}', '{}', '{}', {}, '{}'".format(idcine, nombrecine, direccioncine, idtipocine, fechaapertura))
    return HttpResponse(numaffected)

def recuperarcine(request):
    osql = SQL()
    idcine = request.GET.get("idcine")
    cineobj = osql.listarJSON("exec recuperarCine '{}'".format(idcine))
    #cinename = cineobj["NOMBRE"]
    #cineaddress = cineobj["DIRECCION"]
    return HttpResponse(json.dumps(cineobj))

def listarTipoCine(request):
    osql=SQL()
    lista=osql.listarJSON("exec listarTipoCine")
    return HttpResponse(json.dumps(lista))


def eliminarcine(request):
    osql=SQL()
    idcine = request.GET.get("idcine")

    numregs = osql.enviarPost("exec eliminarCine '{}'".format(idcine))
    return HttpResponse(numregs)