from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
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
