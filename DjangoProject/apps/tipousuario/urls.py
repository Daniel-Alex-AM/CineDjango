from django.urls import path
from . import views #DONDE ESTAN LOS HTML

urlpatterns = [
    path("listarasync/", views.listarasync),
    path("listar/", views.listar),
    path("agregar/", views.agregar),
]
