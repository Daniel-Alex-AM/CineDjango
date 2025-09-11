from . import views
from django.urls import path

urlpatterns = [
    path("pagtipousrhtml/", views.pagtipousrhtml),
    path("listarpagtipousr/", views.listarpagtipousr),
    path("filtrarpagtipousr/", views.filtrarpagtipousr),
    #

]