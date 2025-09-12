from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
import json
# Create your views here.
def pagtipousrhtml(request):
    return render(request,'pagtipousr\pagtipousr.html',None)

def listarpagtipousr(request):
    #http://localhost:8000/pagtipousr/listarpagtipousr/
    osql = SQL()
    lista = osql.listarJSONWeb("exec listarPagTipoUsr")
    return HttpResponse(lista)


def filtrarpagtipousr(request):
    idtipousr = request.GET.get("idtipousr")
    #http://localhost:8000/pagtipousr/filtrarpagtipousr/?idtipousr=1
    osql = SQL()
    lista = osql.listarJSONWeb("exec filtrarPagTipoUsr '{}'".format(idtipousr))
    return HttpResponse(lista)

def pagtipousredit(request):
    id = request.GET.get("id")
    return render(request,'pagtipousr\editarpagtipousr.html', {"id":id})

def listarbtn(request):
    osql = SQL()
    lista = osql.listarJSONWeb("exec listarBotones")
    return HttpResponse(lista)

def recuperarpagbtntipousr(request):
    id = request.GET.get("id")
    osql = SQL()
    lista = osql.listarJSONWeb("exec recuperarPagBtnTipoUsr '{}'".format(id))
    return HttpResponse(lista)

def guardardatos(request):
    obj = json.loads(request.body.decode('utf-8'))
    checks = obj['opciones']
    idpagtipousr = obj['idpagtipousr']
    print(checks)
    print(idpagtipousr)
    osql = SQL()
    resp = osql.enviarTransaccion("SET NOCOUNT ON;exec guardarBtnsPagTipoUsr '{}', '{}'".format(checks, idpagtipousr))
    return HttpResponse(resp)



