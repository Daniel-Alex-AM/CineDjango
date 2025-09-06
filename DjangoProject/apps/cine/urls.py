from django.urls import path
from . import views

urlpatterns = [
    path('listar/', views.listarcine),
    path('listarCineAsync/', views.listarCineAsync),
    path('listarTipoCine/', views.listarTipoCine),
    path('buscarCineAsync/', views.buscarCineAsync),
    path('guardarcine/', views.guardarcine),
    path('recuperarcine/', views.recuperarcine),
    path('eliminarcine/', views.eliminarcine),

]