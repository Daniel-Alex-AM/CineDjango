window.onload = function () {
    listar()

    $("#txtfechaestreno").datepicker({
        dateFormat: "dd/mm/yy",
        changeYear: true
    });


    //llenarCombo(data, propiedadId, propiedadMostrar, idCombo) 
    //fetchRecuperar(url, callback)

    fetchRecuperar("/pais/listarpaisjson", function (data) {
        llenarCombo(data, "IDPAIS", "NOMBRE", "cboPais")
    });

    fetchRecuperar("/pelicula/listargenerojson", function (data) {
        llenarCombo(data, "IDGENERO", "NOMBRE", "cboGenero")
    });

    fetchRecuperar("/pelicula/listartipocensurajson", function (data) {
        llenarCombo(data, "IDTIPOCENSURA", "NOMBRE", "cboTipoCensura")
    });

}

function listar() {
    pintar("/pelicula/listarPelicula/", undefined, undefined, true, true, "IDPELICULA", true);

}

function previewFoto() {
    var archivo = document.getElementById("fupFoto").files[0];
    var file = new FileReader();

    //Cuando se termine de leer
    file.onloadend = function () {
        //alert(file.result);
        document.getElementById("imgfoto").src = file.result;
        document.getElementById("imgfoto").hidden = false;
    }

    file.readAsDataURL(archivo);
}

function abrirModal() {
    //document.getElementById("exampleModalLabel").innerHTML="Agregar Película";
    setinner("exampleModalLabel", "Agregar Película");
}

function Editar(id = null) {
    limpiarCOntroles(".form-pelicula .form-control")
    setinner("divErrores", "")

    if (id == null) {
        setinner("exampleModalLabel", "Agregar Película");
        document.getElementById("imgfoto").hidden = true

    } else {
        setinner("exampleModalLabel", "Editar Película");

        fetchRecuperar("/pelicula/recuperarpeliculajson/?idpelicula=" + id, function (data) {
            var objeto = data[0];
            set("txtidpelicula", objeto.IDPELICULA);
            set("txttitulo", objeto.TITULO);
            set("txtduracion", objeto.DURACION);
            set("txtsinopsis", objeto.SINOPSIS);
            set("txtfechaestreno", objeto.FECHAESTRENOCADENA);
            set("cboGenero", objeto.IDGENERO);
            set("cboPais", objeto.IDPAIS);
            set("cboTipoCensura", objeto.IDTIPOCENSURA);

            document.getElementById("imgfoto").hidden = false
            setsrc("imgfoto", objeto.FOTO)
        })


    }
}


function guardarDatos() {
    var objeto = {
        "txtidpelicula": get("txtidpelicula"),
        "txttitulo": get("txttitulo"),
        "txtduracion": get("txtduracion"),
        "cboGenero": get("cboGenero"),
        "cboPais": get("cboPais"),
        "cboTipoCensura": get("cboTipoCensura"),
        "txtsinopsis": get("txtsinopsis"),
        "txtfechaestreno": get("txtfechaestreno"),
        "imgfoto": getsrc("imgfoto"),
    }

    var noValidar = ["txtidpelicula"]
    if (imgfoto != null) {
        noValidar.push("fupFoto")
    }

    var obj = validarObligatorios(".form-pelicula .form-control", noValidar)

    if (obj.exito == true) { //hay errores
        setinner("divErrores", obj.contenido);
        return;
    } else {

        confirmarAlert(undefined, function () {
            fetchPost("/pelicula/guardarpelicula/", objeto, function () {
                listar()
                limpiarCOntroles(".form-pelicula .form-control")
                document.getElementById("bntCerrarModal").click()
                setinner("divErrores", "")
            })
        })
    }

}

function cerrarModal() {
    limpiarCOntroles(".form-pelicula .form-control")
}

function Eliminar(id) {
    confirmarAlert("¿Desea eliminar?", function() {
                fetchDel("/pelicula/eliminarpelicula/?idpelicula=" + id, function(data) {
                    //if (data==1) {
                        success("Se eliminó correctamente")
                        listar()
                    //}
                })

    })
}