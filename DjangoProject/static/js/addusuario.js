function guardarDatos() {
    var resultado = validarObligatorios(".form-usuario .form-control", ["txtidusuario"], true)

    if(resultado.exito == false) {
        confirmarAlert('¿Agregar usuario?', function(data) {

            objeto = {
                'idusuario': get('txtidusuario'),
                'username': get('txtnombreusuario'),
                'passwod': get('txtpwduser'),
                'tipousuario': get('tipousrhidden'),
                'idpersona': get('personahidden'),
            }

            fetchPost('/usuario/guardarusuario/', objeto, function(data){
                //si se actualizo todo ok
                window.location.href="/usuario/listar/"
            })
        })
    }
}

function abrirModal(nombre) {
    if (nombre == 'TipoUsuario') {
        setinner("exampleModalLabel", "Buscar o Seleccionar Tipo Usuario")
        pintar('/usuario/listartipousuario/', "divmodalTabla", undefined, false, false, "IIDTIPOUSUARIO", false, undefined, true, "NOMBRE")
    } else {
        setinner("exampleModalLabel", "Buscar o Seleccionar Persona")
        pintar('/persona/listarPersonaAsyncSinUser/', "divmodalTabla", undefined, false, false, "IDPERSONA", false, undefined, true, "NOMBRECOMPLETO")


    }
}

function AsignarValores(id, valor) {
    var titulo = getinner("exampleModalLabel")
    document.getElementById("bntCerrarModal").click()

    if (titulo.includes("Usuario")) {
        set("txtnombretipousuario", valor)
        set("tipousrhidden", id)

    } else {
        set("txtnombrepersona", valor)
        set("personahidden", id)
    }

}