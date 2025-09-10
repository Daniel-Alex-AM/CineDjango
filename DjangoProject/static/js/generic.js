window.onload = function () {
    /*alert("Hola desde generic JS")*/
    $(".dataframe").DataTable();
    $("#table").DataTable();

    var elemento = document.querySelectorAll(".dataframe");
    for (var i = 0; i < elemento.length; i++) {
        elemento[i].classList.add("table");
    }

}

var cabecerasJSON;
function pintar(url, idDiv = "divTabla", idtabla = "tabla",
    opcionEdit = false, opcionElimina = false, propID = "Id",
    popup = false, titulos = [],
    subpopup = false, propDisplay) {

    fetch(url).then(res => res.json())
        .then(res => {
            var contenido = "<table id=" + idtabla + " class='table'>";
            //alert(JSON.stringify(res));
            //alert(Object.keys(res[0]));
            var llaves = null;
            if (res.length > 0) {
                llaves = Object.keys(res[0]); //array
                cabecerasJSON = llaves;
            } else {
                //llaves = []
                llaves = cabecerasJSON;
            }

            contenido += "<thead><tr>";

            if (titulos.length == 0) {
                for (var i = 0; i < llaves.length; i++) {
                    if (llaves[i].toUpperCase() != propID.toUpperCase()) { //aqui no se pinta columna ID porque se pasa como argumento a la funcion
                        contenido += "<td>";
                        contenido += llaves[i].toUpperCase();
                        contenido += "</td>";
                    }
                }
            }
            else {
                for (var i = 0; i < titulos.length; i++) {
                    if (titulos[i].toUpperCase() != propID.toUpperCase()) {
                        contenido += "<td>";
                        contenido += titulos[i].toUpperCase();
                        contenido += "</td>";
                    }
                }
            }

            if (opcionEdit == true || opcionElimina == true || subpopup == true) {
                contenido += "<td>Operaciones</td>"
            }

            contenido += "</tr></thead>";

            contenido += "<tbody>";
            var objeto = null;
            var kactual = null;
            for (var i = 0; i < res.length; i++) {
                objeto = res[i];
                contenido += "<tr>";
                for (var j = 0; j < llaves.length; j++) {
                    kactual = llaves[j];
                    if (kactual.toUpperCase() != propID.toUpperCase()) {
                        contenido += "<td>";
                        contenido += objeto[kactual];
                        contenido += "</td>";
                    }
                }
                if (opcionEdit == true || opcionElimina == true || subpopup == true) {
                    contenido += "<td>";
                    if (opcionEdit == true) {
                        contenido += `
                        <i class='btn btn-primary'
                            onclick='Editar(${objeto[propID]})'
                            ${popup ? 'data-bs-toggle="modal" data-bs-target="#exampleModal"' : ''}
                            >
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                        </i>`
                    }
                    if (opcionElimina == true) {
                        contenido += `
                        <i class='btn btn-danger'  
                            onclick='Eliminar(${objeto[propID]})'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                        </i>
                        `
                    }
                    if (subpopup == true) {

                        contenido += `<i class="btn btn-success" onclick="AsignarValores(${objeto[propID]}, '${objeto[propDisplay]}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                    </svg>
                    </i>
                    `

                    }

                    contenido += "</td>";
                }
                contenido += "</tr>";
            }

            contenido += "</tbody>"
            contenido += "</table>"
            document.getElementById(idDiv).innerHTML = contenido
            $("#"+idtabla).DataTable();

        })
}


function get(id) {
    return document.getElementById(id).value;
}

function getsrc(id) {
    return document.getElementById(id).src;
}

function set(id, valor) {
    document.getElementById(id).value = valor
}

function setinner(id, valor) {
    document.getElementById(id).innerHTML = valor
}

function getinner(id) {
    return document.getElementById(id).innerHTML
}

function setsrc(id, valor) {
    document.getElementById(id).src = valor
}

//GET
function fetchRecuperar(url, callback) {
    fetch(url)
        .then(res => res.json())
        .then(res => { callback(res) })
}

function fetchDel(url, callback) {
    fetch(url)
        .then(res => res.text())
        .then(res => {

            if (res == 1) {
                success("Se eliminó correctamente")
                callback()
            } else {
                console.log(res)
                error()
            }

        })
}

function fetchPost(url, objeto, callback) {
    var token = document.getElementsByName("csrfmiddlewaretoken")[0].value
    fetch(url, {
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": token,
        },
        method: "POST",
        body: JSON.stringify(objeto),
    }).then(res => res.text()).then(res => {
        if (res == 1) {
            success()
            callback()
        } else {
            error("Ocurrió un error")
        }
    })

}

function limpiarCOntroles(selectorCSS) {
    //var controles = document.getElementsByClassName("form-control")
    var controles = document.querySelectorAll(selectorCSS)
    for (var i = 0; i < controles.length; i++) {

        //alert(controles[i].nodeName)
        if (controles[i].nodeName == "SELECT") {
            controles[i].value = "0"
        } else {
            if (controles[i].nodeName == "IMG") {
                controles[i].src = ""
            }
            else {
                controles[i].value = ""
            }
        }
    }
}

function llenarCombo(data, propiedadId, propiedadMostrar, idCombo) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    var elementoActual;
    for (var i = 0; i < data.length; i++) {
        elementoActual = data[i];
        contenido += `<option value='${elementoActual[propiedadId]}'>  
          ${elementoActual[propiedadMostrar]}
        </option>`;
    }

    document.getElementById(idCombo).innerHTML = contenido;
}


function validarObligatorios(selectorCSS, camposObviar = [], campoAcampo = false) {
    var errores = '<ol class="alert alert-danger">';
    var hayerrores = false;
    //var controles = document.getElementsByClassName("form-control")

    var controles = document.querySelectorAll(selectorCSS)
    var control;
    for (var i = 0; i < controles.length; i++) {
        control = controles[i];

        if (control.tagName == "SELECT") { //INPUT - TEXTAREA
            if (campoAcampo == false) {
                if (control.value == "0" && camposObviar.indexOf(control.id) == -1) { //si control.id no esta en el array camposObviar indexOf regresa -1
                    hayerrores = true;
                    errores += "<li>Debe ingresar "

                    custom_err_msg = control.getAttribute("data-campo");
                    if (custom_err_msg == null) {
                        errores += control.id.replace("cbo", "");
                    }
                    else {
                        errores += custom_err_msg;
                    }

                    errores += "</li>"
                }
            } else {
                if (control.value == "0" && camposObviar.indexOf(control.id) == -1) { //si control.id no esta en el array camposObviar indexOf regresa -1
                    hayerrores = true;
                    diverr = document.getElementById("div" + control.id);
                    if (diverr) {
                        custom_err_msg = control.getAttribute("data-campo");
                        if (custom_err_msg == null) {
                            diverr.innerHTML = "<span style='color:red'> Debe ingresar el " + control.id.replace("cbo", "") + "</span>"
                        }
                        else {
                            diverr.innerHTML = "<span style='color:red'> Debe ingresar el " + custom_err_msg + "</span>"
                        }
                    }
                } else {
                     diverr = document.getElementById("div" + control.id);
                    if (diverr) { 
                        diverr.innerHTML=""
                    }

                }
            }
        } else {

            if (campoAcampo == false) {
                if (control.value == "" && camposObviar.indexOf(control.id) == -1) {
                    hayerrores = true;
                    errores += "<li>Debe ingresar "
                    custom_err_msg = control.getAttribute("data-campo");
                    if (custom_err_msg == null) {
                        errores += control.id.replace("txt", "")
                    } else {
                        errores += custom_err_msg
                    }
                    errores += "</li>"
                }
            } else {
                if (control.value == "" && camposObviar.indexOf(control.id) == -1) {
                    hayerrores = true;
                    diverr = document.getElementById("div" + control.id);
                    if (diverr) {
                        custom_err_msg = control.getAttribute("data-campo");
                        if (custom_err_msg == null) {
                            diverr.innerHTML = "<span style='color:red'> Debe ingresar el " + control.id.replace("txt", "") + "</span>"
                        }
                        else {
                            diverr.innerHTML = "<span style='color:red'> Debe ingresar el " + custom_err_msg + "</span>"
                        }
                    }
                } else {
                    diverr = document.getElementById("div" + control.id);
                    if (diverr) {
                        diverr.innerHTML = ""
                    }
                }
            }


        }

    }
    errores += "</ol>";
    return { exito: hayerrores, contenido: errores };
}


function error(texto = "Ocurrio un error") {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: texto,
    });
}

function success(titulo = "Se guardo correctamente") {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: titulo,
        showConfirmButton: false,
        timer: 1500
    });
}

function confirmarAlert(texto = "¿Desea guardar los cambios?", callback) {

    return Swal.fire({
        title: "Confirmar",
        text: texto,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí"
    }).then((result) => {
        if (result.isConfirmed) {
            /*Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });*/
            callback()
        }
    });
}


function setD(id, valor) {
    //display es un elemento de CCS style para ocultar elementos HTML
    /*
    Common value options include:
"none": Hides the element completely, removing it from the document flow and preventing it from taking up any space.

"block": Displays the element as a block-level element, which typically takes up the full width available and starts on a new line.

"inline": Displays the element as an inline-level element, which flows with the surrounding text and only takes up as much width as its content requires.

"inline-block": Displays the element as an inline-level block container, allowing it to sit on the same line as other inline elements while still having block-level properties like width, height, and margins.

"flex": Initializes a flex container, enabling a flexible box layout.

"grid": Initializes a grid container, enabling a CSS Grid layout.
    */

    document.getElementById(id).style.display = valor;
}