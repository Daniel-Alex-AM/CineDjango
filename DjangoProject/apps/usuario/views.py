from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
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