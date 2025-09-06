window.onload = function () {
    listar()
}

function listar() {
    pintar("/funcion/listarjson", undefined, undefined, true, false, "IDFUNCION", false)

    /*fetchRecuperar("/pelicula/listarPelicula/", function (data) {
        llenarCombo(data, "IDPELICULA", "TITULO", "cboPeliculaBuscar")
        llenarCombo(data, "IDPELICULA", "TITULO", "cboPeliculaPop")

    })

    fetchRecuperar("/cine/listarCineAsync/", function (data) {
        llenarCombo(data, "IDCINE", "NOMBRE", "cboCinePop")
    })*/

}

function Editar(id){
    document.location.href="/butaca/verbutacas/?idfuncion="+id
}