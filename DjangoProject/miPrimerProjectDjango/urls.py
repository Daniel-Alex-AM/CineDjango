"""
URL configuration for miPrimerProjectDjango project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# importar scripts que regresan vista
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('inicio/', views.saludo),
    path('curso/', views.curso),
    path('mpp/', views.MiPrimeraPagina),
    path('pais/', include('apps.pais.urls')),
    path('tipocine/', include('apps.tipocine.urls')),
    path('cine/', include('apps.cine.urls')),
    path('persona/', include('apps.persona.urls')),
    path('pelicula/', include('apps.pelicula.urls')),
    path('sala/', include('apps.sala.urls')),
    path('funcion/', include('apps.funcion.urls')),
    path('butaca/', include('apps.butaca.urls')),
    path('usuario/', include('apps.usuario.urls')),
    path('pagtipousr/', include('apps.pagtipousr.urls')),
    path('pagtipousrbtn/', include('apps.pagtipousrbtn.urls')),
    path('pagina/', include('apps.pagina.urls')),
    path('tipousuario/', include('apps.tipousuario.urls')),

]
