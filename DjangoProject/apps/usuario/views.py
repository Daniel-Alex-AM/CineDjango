from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
import json
# Create your views here.

def listarusuarios(request):
    return render(request, "usuario/usuario.html", None)

def agregarusuario(request):
    return render(request, "usuario/agregarusuario.html", None)

def listartipousuario(request):
    osql = SQL()
    lista = osql.listarJSONWeb('exec listarTipoUsuario')
    print(lista)
    return HttpResponse(lista)

def agregarusuario(request):
    osql = SQL()
    objeto = json.loads(request.body.decode('utf-8'))
    idusuario = objeto['idusuario']
    username = objeto['username']
    passwod = objeto['passwod']
    tipousuario = objeto['tipousuario']
    idpersona = objeto['idpersona']
    #-- IDUSUARIO, username, passwod, tipousuario, idpersona
    resp = osql.enviarTransaccion("SET NOCOUNT ON;exec guardarUsuario \
                                  '{}', '{}', '{}', '{}', '{}'".format(idusuario, username,passwod,tipousuario,idpersona))
    
    return HttpResponse(resp)