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

function buscarTipoUsuario(){
    var nombre = get("txtnombretipousuario")
    pintar('/tipousuario/filtrartipousrbyname/?nombretipousr='+nombre, undefined, undefined,
        true, true, "IIDTIPOUSUARIO", false, undefined, false, false)
}


function Eliminar(id) {
    confirmarAlert("¿Desea eliminar?", function () {
        fetchDel("/tipousuario/eliminartipousr/?idtipousr=" + id, function (data) {
            //if (data==1) {
            success("Se eliminó correctamente")
            listar()
            //}
        })

    })
}