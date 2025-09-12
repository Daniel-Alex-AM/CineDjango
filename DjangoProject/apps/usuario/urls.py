from . import views
from django.urls import path

urlpatterns = [
    path("listar/", views.listarusuarios),
    path("agregarusuario/", views.agregarusuario),
    path("listartipousuario/", views.listartipousuario),
    path("guardarusuario/", views.guardarusuario),
    path("listarusrasync/", views.listarusrasync),
    path("recuperarusr/", views.recuperarusr),
    path("login/", views.login),

    
]