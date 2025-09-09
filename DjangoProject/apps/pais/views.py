from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
import json

def listar(request):
   ''' return render(request,"pais/pais.html", {
        "saludo": "Hola amigos (parametro)",
        "dias": ["lunes", "martes", "miercoles","jueves"],
        "cursos":[{"curso":"C#", "profesor":"Daniel", "envivo": True},
                  {"curso":"VB", "profesor":"Alejandro", "envivo": False}]
    })'''
   odasql = SQL()
   listapaisc = odasql.listarJSON("select * from pais") #usando conulta sql
   listapaisp = odasql.listarJSON("exec uspListarPais") #usando procedures
   print (listapaisp)

   return render(request, "pais/pais.html", {"listapaisc": listapaisc, "listapaisp": listapaisp, "nombre": ""})

def listarpaisjson(request):
   odasql = SQL()
   listapaisp = odasql.listarJSON("exec uspListarPais") #usando procedures

   return HttpResponse(json.dumps(listapaisp))

def buscarpais(request):
   odasql = SQL()
   nombrepais = request.POST.get("nombrepais").strip() #name del input
   print("---------buscar pais POST---------")
   print(nombrepais)
   if nombrepais == "" or nombrepais == None:
      listapais = odasql.listarJSON("exec uspListarPais") #usando procedures
   else:
      listapais = odasql.listarJSON('exec filtrarPaisDjango {}'.format(nombrepais))
   """
   
   """
   return render(request, "pais/pais.html", {
      "listapaisc": listapais,
      "listapaisp": listapais,
      "nombre": nombrepais
      })


def buscarpaisget(request):
   odasql = SQL()
   nombrepais = request.GET.get("nombrepaisget") #name del input
   print("---------buscar pais GET---------")
   print(nombrepais)
   listapais = odasql.listarJSON('exec filtrarPaisDjango {}'.format(nombrepais))
   """
   create procedure filtrarPaisDjango
   @nombre varchar(100) /*parametro que recibe*/
   as
   declare @cadena varchar(100) /*variable local*/
   begin

   set @cadena=ltrim(rtrim(@nombre)) /*borra espacios a right/left*/
   if @cadena=''
   exec uspListarPais
   else
   select IDPAIS as IDPAIS, NOMBRE as NOMBRE
   from PAIS
   where upper(NOMBRE) like concat('%',upper(@cadena),'%')

   end
   """
   return render(request, "pais/pais.html", {"listapaisc": listapais, "listapaisp": listapais, "nombre": nombrepais})




def addpais(request):
    return render(request,"pais/addpais.html", None)

def agregarpais(request):
   osql = SQL()
   nombre = request.POST.get("txtnombrepais").strip()
   id = request.POST.get("txtidpais")
   
   if nombre != "":
      registrosafectados = osql.enviarPost("exec guardarPais @nombre='{}', @idpais='{}'".format(nombre, id))
   
   listapais = osql.listarJSON("exec uspListarPais")

   return render(request, "pais/pais.html", {
      "listapaisc": listapais,
      "listapaisp": listapais,
      "nombre": ""
      })

def recuperarpais(request):
   idpais = request.GET.get("idpais")
   osql = SQL()
   paisobj = osql.listarJSON("exec recuperarPais '{}'".format(idpais))
   #print(idpais, paisobj)
   # 1 [{'iDPAIS': 1, 'NOMBRE': 'Mexico'}]
   paisdict = paisobj[0]
   paisnombre = paisdict['NOMBRE']
   listapais = osql.listarJSON("exec uspListarPais")


   return render(request, "pais/pais.html", {
      "listapaisc": listapais,
      "listapaisp": listapais,
      "nombre": paisnombre,
      "idpaisv": idpais
      })


def eliminarpais(request):
   osql = SQL()
   idpais = request.GET.get("idpais")

   nr = osql.enviarPost("exec eliminarpais '{}'".format(idpais))

   if nr == 1:
      listapais = osql.listarJSON("exec uspListarPais")

      return render(request, "pais/pais.html", {
         "listapaisc": listapais,
         "listapaisp": listapais,
         "nombre": ""})



