window.onload = function () {
    listar()
}

function listar() {
    pintar("/usuario/listarusrasync", undefined, undefined, true, true, "IDUSUARIO", true)
}

function abrirModal(mode) {
    setinner("exampleModalLabelTipoUsr", "Buscar o Seleccionar Tipo Usuario")
    pintar('/usuario/listartipousuario/', "divmodalTablaTipoUsr", "divSubTipoUsr", false, false, "IIDTIPOUSUARIO", false, undefined, true, "NOMBRE")

}

function AsignarValores(id, valor) {
    set("tipousrhidden", id)
    set("txtnombretipousuario", valor)

    document.getElementById("bntCerrarModalTipoUsr").click()

    document.getElementById("btnModal").click()
}


function Editar(id) {
    fetchRecuperar('/usuario/recuperarusr/?idusr=' + id, function (data) {
        console.log(data)
    })
}

function guardarDatos() {
    var resultado = validarObligatorios(".form-usuario .form-control", [], true)
    if (resultado.exito == false) {

    }
}