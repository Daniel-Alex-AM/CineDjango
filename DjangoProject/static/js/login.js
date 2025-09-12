function Ingresar(){
    var objeto = {
        "username": get("txtusuario"),
        "passwod": get("txtcontra")
    }

    fetchLogin("/usuario/login/", objeto, function() {
        document.location.href="/paginaprincipal/paginaprincipal/"
    })
}