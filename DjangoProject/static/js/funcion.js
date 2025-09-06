window.onload = function () {
    listar()
}

function listar() {
    pintar("/funcion/listarjson", undefined, undefined, true, true, "IDFUNCION", true)

    fetchRecuperar("/pelicula/listarPelicula/", function (data) {
        llenarCombo(data, "IDPELICULA", "TITULO", "cboPeliculaBuscar")
        llenarCombo(data, "IDPELICULA", "TITULO", "cboPeliculaPop")

    })

    fetchRecuperar("/cine/listarCineAsync/", function (data) {
        llenarCombo(data, "IDCINE", "NOMBRE", "cboCinePop")
    })

}

function llenarSalas() {
    var idcine = get("cboCinePop")

    fetchRecuperar("/funcion/buscarsalas/?idcine=" + idcine, function (data) {
        llenarCombo(data, "IDSALA", "NOMBRE", "cboSalaPop")
    })
}

function filtrarFuncionxPelicula() {
    var idpelicula = get("cboPeliculaBuscar")
    pintar("/funcion/filtrar/?idpelicula=" + idpelicula, undefined, undefined, true, true, "IDFUNCION", true)
}


function Editar(id = null) {
    limpiarCOntroles(".form-funcion .form-control")

    llenarSalas()

    setinner("divErrores", "")

    if (id == null) {
        setinner("exampleModalLabel", "Agregar Función");
        setD("divSalaPop", "block")
        setD("divCinePop", "block")
    } else {
        setinner("exampleModalLabel", "Editar Función");
        setD("divSalaPop", "none") //ocultar elementos HTML
        setD("divCinePop", "none")

        fetchRecuperar("/funcion/recuperarfuncion/?idfuncion=" + id, function (data) {
            var objeto = data[0];

            set("txtidfuncion", objeto.IDFUNCION);
            set("txtfechafuncion", objeto.FECHAFUNCION);
            set("cboPeliculaPop", objeto.IDPELICULA);

        })


    }
}

function guardarDatos() {

    if (get("txtidfuncion") == "") { //nuevo registro
        var obj = validarObligatorios(".form-funcion .form-control", ["txtidfuncion"])
        if (obj.exito == true) {
            document.getElementById("divErrores").innerHTML = obj.contenido;
            return;
        }
    } else { //editar registro
        var obj = validarObligatorios(".form-funcion .form-control", ["txtidfuncion", "cboCinePop", "cboSalaPop"])
        if (obj.exito == true) {
            document.getElementById("divErrores").innerHTML = obj.contenido;
            return;
        }
    }


    idfuncion = get("txtidfuncion")
    fecha = get("txtfechafuncion")
    //Por default fecha es 2025-08-06T22:51 <input type="datetime-local"
    //Para convertir en dd/mm/yyyy hh:mm

    var fechamoment = moment(fecha)
    var fechaformat = fechamoment.format('DD/MM/YYYY HH:mm')

    idpelicula = get("cboPeliculaPop")
    idcine = get("cboCinePop")
    idsala = get("cboSalaPop")

    var objeto = {
        idfuncion,
        fechaformat,
        idpelicula,
        idcine,
        idsala
    }

    fetchPost("/funcion/guardarfuncion/", objeto, function (data) {
        confirmarAlert("¿Guardar cambios?", function (data) {
            success()
            listar()
            limpiarCOntroles(".form-funcion .form-control")

            llenarSalas()

            setinner("divErrores", "")
            document.getElementById("bntCerrarModal").click()
        })
    })
}


function Eliminar(id) {
    confirmarAlert(undefined, function(){
        fetchDel("/funcion/eliminarfuncion/?idfuncion="+id, function(){
            listar()
        })
    });

}