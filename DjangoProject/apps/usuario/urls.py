from . import views
from django.urls import path

urlpatterns = [
    path("listar/", views.listarusuarios),
    path("agregarusuario/", views.agregarusuario),
    path("listartipousuario/", views.listartipousuario),
]