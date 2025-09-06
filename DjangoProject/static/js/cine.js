window.onload = function () {
    listar()
}

function listar() {
    pintar("/cine/listarCineAsync", undefined, undefined, true, true, "IDCINE");
    fetchRecuperar("/cine/listarTipoCine/", function (data) {
        llenarCombo(data, "idtipocine", "nombre", "cboTipoCine")

    })

    $("#txtfechaapertura").datepicker({
        dateFormat: "dd/mm/yy",
        changeYear: true
    });
}

function buscarCine() {
    var ncine = get("txtnombre") //get está en generic.js
    pintar("/cine/buscarCineAsync/?nombre=" + ncine) //mandar parametro a python


}

function Editar(id) {
    fetchRecuperar(`/cine/recuperarcine/?idcine=${id}`, function (data) {
        var objeto = data[0];
        set("txtidcine", objeto.IDCINE)
        set("txtnombrecine", objeto.NOMBRE)
        set("txtdireccioncine", objeto.DIRECCION)
        set("cboTipoCine", objeto.IDTIPOCINE)
        set("txtfechaapertura", objeto.FECHAAPERTURA)
    });
    /*
    
        fetch(`/cine/recuperarcine/?idcine=${id}`)
            .then(res => res.json())
            .then(res => {
                var objeto = res[0];
                set("txtidcine", objeto.IDCINE)
                set("txtnombrecine", objeto.NOMBRE)
                set("txtdireccioncine", objeto.DIRECCION)
            })*/
}

function Eliminar(id) {
    alert(id)
}

function guardarCine() {
    // class - subclass (los form-control dentro de formulariocine), ID del campo a ignorar
    var resultado = validarObligatorios(".formulariocine .form-control", ["txtidcine"]);
    if (resultado.exito == true) {
        document.getElementById("divErrores").innerHTML = resultado.contenido;
        return;
    } else {
        //para limpiar div de errores si anteriormente hubo
        document.getElementById("divErrores").innerHTML = "";
    }
    // get ID del elemento html
    var idcine = get("txtidcine")
    var nombrecine = get("txtnombrecine")
    var direccion = get("txtdireccioncine")
    //var token = document.getElementsByName("csrfmiddlewaretoken")[0].value
    var idtipocine = get("cboTipoCine")
    var fechaapertura = get("txtfechaapertura")
    if (nombrecine != "") {
        var objeto = {
            "idcine": idcine,
            "nombrecine": nombrecine,
            "direccion": direccion,
            "idtipocine": idtipocine,
            "fechaapertura": fechaapertura
        }


        confirmarAlert(undefined, function (data) {

            fetchPost("/cine/guardarcine/", objeto, function () {
                listar()
                limpiarCOntroles(".formcine .form-control");
            })


        })


    }


    //usar fetch con POST
    /*fetch("/cine/guardarcine/",{
        headers:{
            "Content-type": "application/json",
            "X-CSRFToken": token,
        },
        method:"POST",
        body: JSON.stringify(objeto),
    }).then(res=>res.text()).then(res=>{
        if(res==1) {
            listar()
        } else {
            alert("Ocurrió un error")
        }
    })*/


}

function NuevoCine() {
    limpiarCOntroles(".formcine .form-control")
}



//LLAMADA A FUNCIÓN (se mueve a generic)

/* fetch("/cine/listarCineAsync").then(res=>res.json())
 .then(res=>{
     var contenido = "<table class='table'>";
     alert(JSON.stringify(res));
     alert(Object.keys(res[0]));
     var llaves = Object.keys(res[0]); //array

     contenido += "<thead><tr>";

     for(var i=0; i<llaves.length; i++) {
         contenido+="<td>";
         contenido+=llaves[i].toUpperCase();
         contenido+="</td>";
     }

     contenido += "</tr></thead>";

     contenido+="<tbody>";
     var objeto = null;
     var kactual = null;
     for(var i=0;i<res.length;i++){
         objeto=res[i];
         contenido+="<tr>";
         for(var j=0; j<llaves.length; j++) {
             kactual=llaves[j];
             contenido+="<td>";
             contenido+=objeto[kactual];
             contenido+="</td>";
         }
         contenido+="</tr>";
     }

     contenido+="</tbody>"


     contenido+="</table>"
     document.getElementById("divTablaCine").innerHTML=contenido
 })*/


function Eliminar(id) {

    confirmarAlert("¿Realmente desea eliminar cine?", function () {
        fetchDel("/cine/eliminarcine/?idcine=" + id, function (data) {
            listar()
            limpiarCOntroles(".formcine .form-control")

        })
    })



}