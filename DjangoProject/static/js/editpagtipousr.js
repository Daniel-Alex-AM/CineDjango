window.onload = function () {
    listar()
}


function listar() {
    pintar('/pagtipousr/listarbtn/', undefined, undefined, false, false, "IIDBOTON", false, undefined, undefined, undefined, true,
        true, function () {
            //alert('se ejecuta luego de pintar todo')
            recuperarBtnsSeleccionados()
        }
    )
}


function recuperarBtnsSeleccionados() {
    var id = get("txtidpagtipousr")
    fetchRecuperar('/pagtipousr/recuperarpagbtntipousr/?id=' + id, function (data) {
        var objActual
        for (var i = 0; i < data.length; i++) {
            objActual = data[i]
            document.getElementById("chk" + objActual['IIDBOTON']).checked = true
        }

    })
}




function guardarDatos() {
    //var resultado = validarObligatorios(".form-tipousr .form-control", ["txtidtipousr"], true)

    //if (resultado.exito == false) {
        confirmarAlert('¿Confirmar operacion?', function (data) {

            objeto = {
                'opciones': obtenerChecksSeleccionados(), //checks
                'idpagtipousr': get('txtidpagtipousr')
            }

            fetchPost('/pagtipousr/guardardatos/', objeto, function (data) {
                //si se actualizo todo ok
                window.location.href = "/pagtipousr/pagtipousrhtml/"
                success()

            })
        })
    //}
}