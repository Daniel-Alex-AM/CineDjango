from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
# Create your views here.
def listarasync(request):
    osql = SQL()
    lista = osql.listarJSONWeb("exec listarPaginas")
    return HttpResponse(lista)