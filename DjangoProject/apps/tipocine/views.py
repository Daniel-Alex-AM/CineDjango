from django.shortcuts import render
from webconfig.query import SQL

def listar(request):
    odasql = SQL()
    listatipocine = odasql.listar("exec listarTipoCine")
    return render(request,'tipocine/tipocine.html', {
        "lista": listatipocine,
        "ntipocine": ""
    })

def buscartipocine(request):
    odasql = SQL()
    ntipocine = request.POST.get("ntipocine")
    listatipocine = odasql.listar("exec filtrarTipoCine '{}'".format(ntipocine))
    return render(request, 'tipocine/tipocine.html', 
                  {"lista": listatipocine,
                   "ntipocine": ntipocine})
