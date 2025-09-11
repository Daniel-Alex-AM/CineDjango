window.onload = function () {
    listar()
}


function listar() {
    pintar('/pagina/listarasync/', undefined, undefined, false, false, "IIDPAGINA", false, undefined, undefined, undefined, true)
}


function guardarDatos() {
    var resultado = validarObligatorios(".form-tipousr .form-control", ["txtidtipousr"], true)

    if (resultado.exito == false) {
        confirmarAlert('¿Agregar tipo usuario?', function (data) {

            objeto = {
                'idtipousr': get('txtidtipousr'),
                'nombretipousr': get('txtnombretipousr'),
                'descripcion': get('txtdescripcion'),
                'opciones': obtenerChecksSeleccionados(), //checks
            }

            fetchPost('/tipousuario/guardartipousr/', objeto, function (data) {
                //si se actualizo todo ok
                success()
                window.location.href = "/tipousuario/listar/"
            })
        })
    }
}