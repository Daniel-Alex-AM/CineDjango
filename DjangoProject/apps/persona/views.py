from django.http import HttpResponse
from django.shortcuts import render
from webconfig.query import SQL
import json

def listar(request):
    #osql = SQL();
    return render(request, "persona/listar.html", None)

def listarPersonaAsync(request):
    osql = SQL()
    lista = osql.listarJSON("exec listarPersona")
    return HttpResponse(json.dumps(lista))

def buscarPersonaAsync(request):
    osql = SQL()
    nombrep = request.GET.get("nombrep")
    lista = osql.listarJSON("exec filtrarPersona '{}'".format(nombrep))
    return HttpResponse(json.dumps(lista))

def agregarpersona(request):
    osql = SQL()
    listaSexo = osql.listarJSON("exec listarSexo")
    return render(request, "persona/agregarpersona.html", {
        "listaSexo": listaSexo
    })

def guardarpersona(request):
    objetoErr = {}
    err = False
    osql = SQL()
    # Cuando se hace un Form se envian los NAME en el request
    idpersona = request.POST.get("idpersona")
    dnipersona = request.POST.get("dnipersona")
    if dnipersona == "":
        objetoErr["dnipersona"]="Debe ingresar su DNI"
        err = True

    nombrepersona = request.POST.get("nombrepersona")
    if nombrepersona == "":
        objetoErr["nombrepersona"]="Debe ingresar su Nombre"
        err = True

    apaternopersona = request.POST.get("apaternopersona")
    if apaternopersona == "":
        objetoErr["apaternopersona"]="Debe ingresar su A. Paterno"
        err = True

    amaternopersona = request.POST.get("amaternopersona")
    if amaternopersona == "":
        objetoErr["amaternopersona"]="Debe ingresar su A. Materno"
        err = True

    fechanac = request.POST.get("fechanac")
    if fechanac == "":
        objetoErr["fechanac"]="Debe ingresar su Fecha de Nacimiento"
        err = True

    direccion = request.POST.get("direccion")
    telfijo = request.POST.get("telfijo")
    telcel = request.POST.get("telcel")
    idsexo =  request.POST.get("idsexo")
    if idsexo=="0":
        objetoErr["idsexo"]="Debe ingresar su Sexo"
        err = True
    
    objData = {
        "dnipersona":dnipersona,
        "nombre":nombrepersona,
        "apaterno":apaternopersona,
        "amaterno":amaternopersona,
        "fechanac":fechanac,
        "direccion":direccion,
        "telfijo":telfijo,
        "telcel":telcel,
        "idsexo":int(idsexo)
    }

    if err == False:
        numregafectados = osql.enviarPost("exec guardarPersona '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'"\
                                      .format(idpersona, dnipersona, nombrepersona, apaternopersona, amaternopersona, fechanac, \
                                              direccion, telfijo, telcel, idsexo))
        if numregafectados==1:
            return render(request, "persona/listar.html", None)
        else:
            listaSexo = osql.listarJSON("exec listarSexo")

            return render(request, "persona/agregarpersona.html", {"objData": objData, "listaSexo": listaSexo})

    else:
        listaSexo = osql.listarJSON("exec listarSexo")
        print(listaSexo)
        return render(request, "persona/agregarpersona.html", {
            "objetoErr": objetoErr,
            "objData": objData,
            "listaSexo": listaSexo
            })
    

def editarpersona(request):
    osql = SQL()
    idpersona = request.GET.get("idpersona")

    recuperarDatos = osql.listarJSON("exec recuperarPersona {}".format(idpersona))[0]

    idsexo = recuperarDatos['IDSEXO']
    listaSexo = osql.listarJSON("exec listarSexo")
    return render(request,"persona/editarpersona.html", {
        "listaSexo": listaSexo,
        "obj": recuperarDatos

    })

