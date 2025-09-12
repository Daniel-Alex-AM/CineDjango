from . import views
from django.urls import path

urlpatterns = [
    path("pagtipousrhtml/", views.pagtipousrhtml),
    path("listarpagtipousr/", views.listarpagtipousr),
    path("filtrarpagtipousr/", views.filtrarpagtipousr),
    path("pagtipousredit/", views.pagtipousredit),
    path("listarbtn/", views.listarbtn),
    path("guardardatos/", views.guardardatos),
    path("recuperarpagbtntipousr/", views.recuperarpagbtntipousr),
    #recuperarPagBtnTipoUsr

]