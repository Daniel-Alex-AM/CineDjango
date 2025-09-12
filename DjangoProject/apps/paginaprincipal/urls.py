from . import views
from django.urls import path

urlpatterns = [
    path("paginaprincipal/", views.paginaprincipal),

]