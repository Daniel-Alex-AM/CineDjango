from django.http import HttpResponse
from django.shortcuts import render

def saludo(request):
    return HttpResponse("Hola mundo")

def curso(request):
    return HttpResponse("Bienvenido al curso Django Python")

def MiPrimeraPagina(request):
    return render(request,"inicio.html", None)