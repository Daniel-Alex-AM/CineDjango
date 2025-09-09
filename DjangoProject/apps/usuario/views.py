from django.shortcuts import render
from webconfig.query import SQL
# Create your views here.

def listarusuarios(request):
    return render(request, "usuario/usuario.html", None)

def agregarusuario(request):
    return render(request, "usuario/agregarusuario.html", None)