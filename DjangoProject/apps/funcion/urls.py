from . import views
from django.urls import path

urlpatterns = [
    path("listar/", views.listarfuncion),
    path("listarjson/", views.listarjson),
    path("filtrar/", views.filtrar),
    path("guardarfuncion/", views.guardarfuncion),
    path("buscarsalas/", views.buscarsalas),
    path("recuperarfuncion/", views.recuperarfuncion),
    path("eliminarfuncion/", views.eliminarfuncion),
]