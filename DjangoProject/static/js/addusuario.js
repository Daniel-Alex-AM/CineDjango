function guardarDatos() {
    var resultado = validarObligatorios(".form-usuario .form-control", ["txtidusuario"], true)
}

function abrirModal(nombre) {
    if (nombre == 'TipoUsuario') {
        setinner("exampleModalLabel", "Buscar o Seleccionar Tipo Usuario")
        pintar('/usuario/listartipousuario/', "divmodalTabla", undefined,false, false,"IIDTIPOUSUARIO",false,undefined, true, "NOMBRE")
    } else {
        setinner("exampleModalLabel", "Buscar o Seleccionar Persona")
        pintar('/persona/listarPersonaAsync/', "divmodalTabla", undefined,false, false,"IDPERSONA",false,undefined, true, "NOMBRECOMPLETO")


    }
}