from . import views
from django.urls import path

urlpatterns = [
    path("listar/", views.listarsala),
    path("listarsalajson/", views.listarsalajson),
    path("filtrosala/", views.filtrosala),
    path("recuperarsalajson/", views.recuperarsalajson),
    path("guardarsala/", views.guardarsala),
    path("eliminarsala/", views.eliminarsala)

]