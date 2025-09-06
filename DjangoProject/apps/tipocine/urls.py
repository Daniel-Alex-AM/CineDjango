from django.urls import path
from . import views #DONDE ESTAN LOS HTML

urlpatterns = [
    path("listar/", views.listar),
    path("buscartipocine/", views.buscartipocine),
]
