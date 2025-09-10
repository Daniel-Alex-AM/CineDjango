from . import views
from django.urls import path

urlpatterns = [
    path("listarasync/", views.listarasync),

]