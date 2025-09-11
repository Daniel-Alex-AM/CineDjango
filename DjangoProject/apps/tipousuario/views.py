from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
import json

# Create your views here.

def listarasync(request):
    osql = SQL()
    lista = osql.listarJSONWeb('exec listarTipoUsuarioBD')
    return HttpResponse(lista)

def listar(request):
    return render(request,'tipousuario/tipousuario.html', None)

def agregar(request):
    return render(request,'tipousuario/agregartipousuario.html', None)

def guardartipousr(request):
    osql = SQL()
    objeto = json.loads(request.body.decode('utf-8'))
    idusr = objeto['idtipousr']
    nombretipousr = objeto['nombretipousr']
    descripcion = objeto['descripcion']
    opciones = objeto['opciones']

    resp = osql.enviarTransaccion("SET NOCOUNT ON;exec guardarTipoUsuario '{}', '{}', '{}', '{}'".format(idusr, nombretipousr, descripcion, opciones))
    return HttpResponse(resp)

def editartipousr(request):
    idtipousr = request.GET.get("idtipousr")
    return render(request,'tipousuario/editartipousr.html', {"idtipousr": idtipousr})

def recuperartipousr(request):
    osql = SQL()
    idtipousr = request.GET.get("idtipousr")
    lista = osql.listarJSONWeb("exec recuperarTipoUsr '{}'".format(idtipousr))
    return HttpResponse(lista)

def recuperardetalletipousr(request):
    osql = SQL()
    idtipousr = request.GET.get("idtipousr")
    lista = osql.listarJSONWeb("exec recuperarPaginasByTipoUsr '{}'".format(idtipousr))
    return HttpResponse(lista)
