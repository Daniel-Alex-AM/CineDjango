window.onload = function () {
    listar()
}

function listar() {
    pintar("/funcion/listarjson", undefined, undefined, true, false, "IDFUNCION", false)
}

function Editar(id) {
    document.location.href = "/butaca/verbutacas/?idfuncion=" + id
}


function abrirModalBuscar() {
    setinner("exampleModalLabel", "Buscar o Seleccionar Butaca")
    
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

    pintar('/cine/listarCineAsync/', 
        "divTablaSubpopup", 
        "idTablaSubpopup", 
        false, 
        false, 
        "IDCINE", 
        false, 
        undefined, 
        true, 
        "NOMBRE")
}

function AsignarValores(id, valor) {
    set("txtnombrecine", valor)
    set("idcine", id)
    document.getElementById("bntCerrarModal").click()

    pintar("/funcion/buscarfuncionporcine/?idcine="+id, undefined, undefined, true, false, "IDFUNCION", false)

}

function cerrarModal() {

}

function cleanButaca(){
    set("txtnombrecine", "")
    set("idcine", "")
    listar()
}