from django.urls import path
from . import views #DONDE ESTAN LOS HTML

urlpatterns = [
    path("listarasync/", views.listarasync),
    path("listar/", views.listar),
    path("agregar/", views.agregar),
    path("guardartipousr/", views.guardartipousr),
    path("editartipousr/", views.editartipousr),
    path("recuperartipousr/", views.recuperartipousr),
    path("recuperardetalletipousr/", views.recuperardetalletipousr),
]
