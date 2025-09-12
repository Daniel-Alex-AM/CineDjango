window.onload = function () {
    listar()
}


function listar() {
    pintar('/pagtipousr/listarpagtipousr/', undefined, undefined,
        true, false, "IIDPAGINATIPOUSUARIO", false, undefined, false, false)
}
/*
function Editar(id) {
    window.location.href = "/tipousuario/editartipousr/?idtipousr=" + id
}*/


function abrirModalBuscar() {
    setinner("exampleModalLabel", "Buscar o Seleccionar Tipo Usuario")

    /*url, 
    idDiv objetivo, 
    idTabla (nueva), 
    botonEdit, 
    botonDelete, 
    propID (id del obj), 
    popup, 
        (Hará que el click en Editar abra un nuevo popup)
    titulos, 
    subpopup, 
        (este elemento es un subpopup y hacer click lo cerrará y ejecutara el AsignarValores(id, valor))
    propDisplay 
        (campo a mostrar, en otro elemento (tal vez pagina padre), cuando se seleccione)
        Tiene que definirse un AsignarValores(id, valor) en js para setear el valor y recuperarlo*/

    pintar('/tipousuario/listarasync/',
        "divTablaSubpopup",
        "idTablaSubpopup",
        false,
        false,
        "IIDTIPOUSUARIO",
        false,
        undefined,
        true,
        "NOMBRE")
}

function cleanTipoUsr() {
    set("txtnombre", "")
    set("txtidtipousr", "")
    listar()
}


function AsignarValores(id, valor) {
    set("txtnombre", valor)
    set("txtidtipousr", id)
    document.getElementById("bntCerrarModal").click()

    pintar("/pagtipousr/filtrarpagtipousr/?idtipousr=" + id, undefined, undefined, true, false, "IIDPAGINATIPOUSUARIO", false)

}


function Editar(id) {
    window.location.href ="/pagtipousr/pagtipousredit/?id="+id
}
