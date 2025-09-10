from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
# Create your views here.

def listarasync(request):
    osql = SQL()
    lista = osql.listarJSONWeb('exec listarTipoUsuarioBD')
    return HttpResponse(lista)

def listar(request):
    return render(request,'tipousuario/tipousuario.html', None)

def agregar(request):
    return render(request,'tipousuario/agregartipousuario.html', None)

