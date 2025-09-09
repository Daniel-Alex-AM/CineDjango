window.onload=function(){
    pintar("/persona/listarPersonaAsync", undefined, undefined, true, true,"IDPERSONA");
}

function buscarPersona() {
    var nombre = get("txtnombrepersona")
    pintar("/persona/buscarPersonaAsync/?nombrep="+nombre)
}


function Editar(id) {
    document.location.href = "/persona/editarpersona/?idpersona="+id
}

function Eliminar(id) {
    confirmarAlert(undefined, function() {
        
    })
}


