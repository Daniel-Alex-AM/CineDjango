from . import views
from django.urls import path

urlpatterns = [
    path("verboton/", views.verboton),
    path("listarboton/", views.listarboton),
    #listarBtnBD
]