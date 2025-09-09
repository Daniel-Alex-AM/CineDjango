window.onload = function () {
    listar()
}

function listar() {
    var idfuncion = get("txtidfuncion")
    //alert(idfuncion)
    fetchRecuperar("/butaca/buscarbutacas/?idfuncion=" + idfuncion, function (data) {
        console.log(data)
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
                contenido+= `
                <div style='width:60px;height:60px;margin:16px;background-color:${obj.BLIBRE==true?'blue':'red'}'>

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