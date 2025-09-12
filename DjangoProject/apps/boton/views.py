from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
# Create your views here.
def verboton(request):
    return render(request, 'boton/boton.html',None)

def listarboton(request):
    osql = SQL()
    lista = osql.listarJSONWeb("exec listarBtnBD")
    return HttpResponse(lista)