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

    document.getElementById("bntCerrarModalTipoUsr").click() //cierra el submodal tipo usr
    document.getElementById("btnModal").click() //Estre abre el modal original
}


function Editar(id) {
    var isID = get("txtidusuario")
    if (isID == "") {
        fetchRecuperar('/usuario/recuperarusr/?idusr=' + id, function (data) {
            obj = data[0]
            set("txtidusuario", obj['IDUSUARIO'])
            set("txtnombreusuario", obj['NOMBREUSUARIO'])
            set("txtnombretipousuario", obj['NOMBRETIPOUSUARIO'])
            set("tipousrhidden", obj['IDTIPOUSR'])
        })
    }
}

function guardarDatos() {
    var resultado = validarObligatorios(".form-usuario .form-control", [], true)
    if (resultado.exito == false) {
        confirmarAlert('Modificar usuario?', function (data) {

            objeto = {
                'idusuario': get('txtidusuario'),
                'username': get('txtnombreusuario'),
                'tipousuario': get('tipousrhidden'),
                'passwod': '',
                'idpersona': 0
            }

            fetchPost('/usuario/guardarusuario/', objeto, function (data) {
                document.getElementById("bntCerrarModal").click() //cierra el modal editar 
                listar()
            })
        })
    }
}