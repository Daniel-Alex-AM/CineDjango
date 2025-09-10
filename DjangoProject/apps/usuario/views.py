from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
import json
import hashlib

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

def guardarusuario(request):
    osql = SQL()
    objeto = json.loads(request.body.decode('utf-8'))
    idusuario = objeto['idusuario']
    username = objeto['username']
    passwod = objeto['passwod'] #este es cadena
    #para cifrar una cadena tiene que ser byte
    pwdcifrada = hashlib.sha256(passwod.encode()).hexdigest()

    tipousuario = objeto['tipousuario']
    idpersona = objeto['idpersona']
    #-- IDUSUARIO, username, passwod, tipousuario, idpersona
    resp = osql.enviarTransaccion("SET NOCOUNT ON;exec guardarUsuario \
                                  '{}', '{}', '{}', '{}', '{}'".format(idusuario, username,pwdcifrada,tipousuario,idpersona))
    
    return HttpResponse(resp)

def listarusrasync(request):
    osql = SQL()

    lista = osql.listarJSONWeb("exec listarUsuarioTipoPersona")
    return HttpResponse(lista)

def recuperarusr(request):
    osql = SQL()
    idusr = request.GET.get("idusr")
    lista = osql.listarJSONWeb("exec recuperarUsuarioById '{}'".format(idusr))
    return HttpResponse(lista)