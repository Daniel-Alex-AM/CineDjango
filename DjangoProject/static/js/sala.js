var tableHeaders = ["SALA", "CINE", "#COLS", "#ROWS"];

window.onload = function () {
    listar()
}


function listar() {
    pintar("/sala/listarsalajson", undefined, undefined, true, true, "IDSALA", true, tableHeaders)

    fetchRecuperar("/cine/listarCineAsync", function(data){
        llenarCombo(data, "IDCINE", "NOMBRE", "cboCineBuscar")
        llenarCombo(data, "IDCINE", "NOMBRE", "cboCine")
    })
}

function buscar() {
    var idcine = get("cboCineBuscar") //documenht get element by id

    pintar("/sala/filtrosala/?idcine="+idcine, undefined, undefined, true, true, "IDSALA", true, tableHeaders)

}


function Editar(id = null) {
    limpiarCOntroles(".form-sala .form-control")
    setinner("divErrores", "")

    if (id == null) {
        setinner("exampleModalLabel", "Agregar Sala");

    } else {
        setinner("exampleModalLabel", "Editar Sala");

        fetchRecuperar("/sala/recuperarsalajson/?idsala=" + id, function (data) {
            var objeto = data[0];
            console.log(objeto)
            set("txtidsala", objeto.IDSALA);
            set("txtnombresala", objeto.NOMBRE);
            set("txtnumcolumnas", objeto.NUMEROCOLUMNAS);
            set("txtnumfilas", objeto.NUMEROFILAS);
            set("cboCine", objeto.IDCINE);

        })


    }
}

function guardarDatos(){
    var obj = validarObligatorios(".form-sala .form-control", ["txtidsala"] )

    if (obj.exito == true) {
        setinner("divErrores", obj.contenido)
        return;
    } else {
        var objeto = {
            "idsala": get("txtidsala"),
            "nombresala": get("txtnombresala"),
            "numcolumnas": get("txtnumcolumnas"),
            "numfilas": get("txtnumfilas"),
            "idcine": get("cboCine")
        }

        confirmarAlert("¿Desea guardar datos de la sala?", function(data){
            fetchPost("/sala/guardarsala/", objeto, function(data) {
                success()
                listar()
                limpiarCOntroles(".form-sala .form-control")
                document.getElementById("bntCerrarModal").click()
                setinner("divErrores", "")

            })
        })
    }

}

function Eliminar(id) {
    confirmarAlert(undefined, function(){
        fetchDel("/sala/eliminarsala/?idsala="+id, function(){
            listar()
        })
    });

}