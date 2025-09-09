from . import views
from django.urls import path

urlpatterns = [
    path("listar/", views.listar), #solo mostrar html en pantalla
    path("listarPersonaAsync/", views.listarPersonaAsync), #logica asincrona get data
    path("buscarPersonaAsync/", views.buscarPersonaAsync),
    path("agregarpersona/", views.agregarpersona), #muestra pagina/formulario
    path("guardarpersona/", views.guardarpersona),
    path("editarpersona/", views.editarpersona),
    
]