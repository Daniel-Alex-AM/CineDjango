from django.shortcuts import render
from django.http import HttpResponse
from webconfig.query import SQL
import json


# Create your views here.
def listarbutacas(request):
    return render(request, "butaca/butaca.html", {})
    
def verbutacas(request):
    idfunc = request.GET.get("idfuncion")
    return render(request, "butaca/verButacas.html", {"idfuncion":idfunc})

def buscarbutacas(request):
    #http://localhost:8000/butaca/buscarbutacas/?idfuncion=24
    osql = SQL()
    idfunc = request.GET.get("idfuncion")
    resp = osql.listarJSONWeb("exec recuperarButacas '{}'".format(idfunc))
    return HttpResponse(resp)

def deshabilitarbutaca(request):
    osql = SQL()
    idfuncion = request.GET.get("idfuncion")
    idbutaca = request.GET.get("idbutaca")
    query = "exec deshabilitarButaca '{}', '{}'".format(idfuncion, idbutaca)
    resp = osql.enviarPost(query)
    return HttpResponse(resp)