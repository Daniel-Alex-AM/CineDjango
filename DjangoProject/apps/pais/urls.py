from django.urls import path
from . import views

urlpatterns = [
    path("listar/", views.listar),
    path("listarpaisjson/", views.listarpaisjson),
    path("add/", views.addpais),
    path("buscarpais/", views.buscarpais),
    path("buscarpaisget/", views.buscarpaisget),
    path("agregarpais/", views.agregarpais),
    path("recuperarpais/", views.recuperarpais),
    path("eliminarpais/", views.eliminarpais),

]