from django.shortcuts import render
from django.http import HttpResponse
from webconfig.query import SQL
import json


# Create your views here.
def listarbutacas(request):
    return render(request, "butaca/butaca.html", {})
    
def verbutacas(request):
    return render(request, "butaca/verButacas.html", {})
