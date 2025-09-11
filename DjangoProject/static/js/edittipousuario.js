window.onload = function () {
    listar()
}


function listar() {
    pintar('/pagina/listarasync/', undefined, undefined, false, false, "IIDPAGINA", false, undefined, undefined, undefined, true,
        true, function () {
            //alert('se ejecuta luego de pintar todo')
            recuperarPagsSeleccionadas()
        }
    )

    recuperarTipoUsr()
}

function recuperarPagsSeleccionadas() {
    var idtipousr = get("txtidtipousrhidden")
    fetchRecuperar('/tipousuario/recuperardetalletipousr/?idtipousr=' + idtipousr, function (data) {
        // data = [{"IIDPAGINA":1},{"IIDPAGINA":3}]
        var objActual
        for (var i = 0; i < data.length; i++) {
            objActual = data[i]
            document.getElementById("chk" + objActual['IIDPAGINA']).checked = true
        }

    })
}

function recuperarTipoUsr() {
    var idtipousr = get("txtidtipousrhidden")
    fetchRecuperar('/tipousuario/recuperartipousr/?idtipousr=' + idtipousr, function (data) {
        obj = data[0]
        idtipousr = obj['IIDTIPOUSUARIO']
        nombretipousr = obj['NOMBRE']
        descrtipousr = obj['DESCRIPCION']

        set("txtidtipousr", idtipousr)
        set("txtnombretipousr", nombretipousr)
        set("txtdescripcion", descrtipousr)

    })
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
                window.location.href = "/tipousuario/listar/"
                success()

            })
        })
    }
}