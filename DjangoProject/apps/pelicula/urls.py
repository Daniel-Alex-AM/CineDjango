from django.urls import path
from . import views

urlpatterns = [
    path("listar/", views.listar),
    path("listarPelicula/", views.listarPelicula),
    path("recuperarpeliculajson/", views.recuperarpeliculajson),
    path("eliminarpelicula/", views.eliminarpelicula),
    path("guardarpelicula/", views.guardarpelicula),
    path("listargenerojson/", views.listargenerojson),
    path("listartipocensurajson/", views.listartipocensurajson)
]