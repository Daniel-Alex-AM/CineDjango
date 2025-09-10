window.onload = function() {
    listar()
}

function listar() {
    pintar("/usuario/listarusrasync", undefined, undefined, true, true, "IDUSUARIO", true)
}

function abrirModal(mode) {
    setinner("exampleModalLabelTipoUsr", "Buscar o Seleccionar Tipo Usuario")
    pintar('/usuario/listartipousuario/', "divmodalTablaTipoUsr", "divSubTipoUsr", false, false, "IIDTIPOUSUARIO", false, undefined, true, "NOMBRE")

}