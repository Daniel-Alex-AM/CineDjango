window.onload = function () {
    listar()
}

function listar() {
    var idfuncion = get("txtidfuncion")
    //alert(idfuncion)
    fetchRecuperar("/butaca/buscarbutacas/?idfuncion=" + idfuncion, function (data) {
        var objeto = data[data.length - 1]  //ultimo elemento
        var ixfila = objeto.INDICEFILA
        var ixcol = objeto.INDICECOLUMNA

        var obj
        var contador = 0
        var contenido = "<div>"

        for (var i = 0; i < ixfila; i++) {
            contenido += "<div style='display:flex'>" //TODOS LOS ELEMENTOS HIJOS se ponen uno al costado del otro

            for (var j = 0; j < ixcol; j++) {
                obj = data[contador]
                contenido += `
                <div ondblclick='mostrarMsg(${obj.BHABILITADO}, ${obj.BLIBRE}, ${contador+1}, ${obj.IDBUTACA})' style='width:60px;height:60px;margin:16px;
                color:white; display:flex; justify-content:center; align-items:center; font-weight:bold;
                background-color:${obj.BHABILITADO == true ? `${obj.BLIBRE == true ? 'blue' : 'red'}` : 'gray'}'>

                    ${contador + 1}

                </div>
                `
                contador++;
            }

            contenido += "</div>"

        }

        contenido += "</div>"

        setinner("divTabla", contenido)
    })
}

function mostrarMsg(habilitado, libre, numbutaca, idbutaca) {
    var idfuncion = get("txtidfuncion")
    console.log(habilitado, libre)
    if (habilitado == true && libre == true) {
        confirmarAlert("¿Desea deshabilitar butaca #" + numbutaca, function (data) {
            fetchDel("/butaca/deshabilitarbutaca/?idfuncion="+idfuncion+"&idbutaca="+idbutaca,function(data){
                listar()
                success("Se deshabilitó correctamente")

            })
        })
    }



}

