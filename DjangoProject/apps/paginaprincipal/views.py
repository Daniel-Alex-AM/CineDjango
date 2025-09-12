from django.shortcuts import render

# Create your views here.
def paginaprincipal(request):
    idusr = request.session["idusuario"]

    return render(request, 'paginaprincipal/paginaprincipal.html', {"id": idusr})