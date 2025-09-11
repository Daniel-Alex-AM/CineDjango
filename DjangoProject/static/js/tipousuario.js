window.onload = function() {
    listar()
}


function listar() {
    pintar('/tipousuario/listarasync/', undefined, undefined, 
        true, true,"IIDTIPOUSUARIO",false,undefined,false,false)
}

function Editar(id) {
    window.location.href = "/tipousuario/editartipousr/?idtipousr="+id
}