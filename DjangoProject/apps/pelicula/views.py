from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
import json

# Create your views here.
def listar(request):
    return render(request, "pelicula/pelicula.html", None)

def listarPelicula(request):
    osql = SQL()
    listarData = osql.listarJSON("exec listarPelicula") #devuelve diccionario
    return HttpResponse(json.dumps(listarData))


def listargenerojson(request):
    osql = SQL()
    listarData = osql.listarJSON("exec listarGenero") #devuelve diccionario
    return HttpResponse(json.dumps(listarData))

def listartipocensurajson(request):
    osql = SQL()
    listarData = osql.listarJSON("exec listarTipoCensura") #devuelve diccionario
    return HttpResponse(json.dumps(listarData))

def recuperarpeliculajson(request):
    osql = SQL()
    idpelicula = request.GET.get("idpelicula")
    listarData = osql.listarJSON("exec recuperarPelicula @idpelicula={}".format(idpelicula))
    return HttpResponse(json.dumps(listarData))

def guardarpelicula(request):
    osql = SQL()

    objeto = json.loads(request.body.decode("utf-8"))
    idpelicula = objeto["txtidpelicula"]
    titulo = objeto["txttitulo"]
    duracion = objeto["txtduracion"]
    idgenero = objeto["cboGenero"]
    idpais = objeto["cboPais"]
    idtipocensura = objeto["cboTipoCensura"]
    sinopsis = objeto["txtsinopsis"]
    fechaestreno = objeto["txtfechaestreno"]
    foto = objeto["imgfoto"]

    numregistrosaffectados = osql.enviarPost("exec guardarPelicula \
                                             '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'".format(idpelicula, titulo, idgenero, idpais, sinopsis, duracion, idtipocensura, foto, fechaestreno))

    return HttpResponse(numregistrosaffectados)
    
def eliminarpelicula(request):
    osql = SQL()
    idpelicula = request.GET.get("idpelicula")
    numregistrosafectados = osql.enviarPost("exec eliminarPelicula '{}'".format(idpelicula))

    return HttpResponse(numregistrosafectados)
