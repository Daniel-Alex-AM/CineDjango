from . import views
from django.urls import path

urlpatterns = [
    path("listar/", views.listarbutacas),
    path("verbutacas/", views.verbutacas),
]