class Persona:
    nombre = "",
    apaterno = "",
    amaterno = "",
    edad = 0

    def __init__(self,nombre,apaterno,amaterno,edad):
        self.nombre = nombre
        self.apaterno = apaterno
        self.amaterno = amaterno
        self.edad = edad


    def saludo(self):
        print("Hola como estas", self.nombre)

    def calcula_edad(self):
        return self.edad + 5
    
    def calc_daltante_edad(self):
        return 100-self.edad


persona1 = Persona("Daniel", "Aguado", "Mendez", 28)
#persona1.nombre = "Daniel"
#persona1.apaterno = "Aguado"
#persona1.amaterno = "Mendez"
#persona1.edad = 28

print(persona1.nombre)
persona1.saludo()

##### Herencia
class Empleado(Persona):
    sueldo = 0
    #sobre-escribe init que hereda de persona
    def __init__(self):
        print("")

empleado1 = Empleado()
empleado1.nombre = "Daniel"
empleado1.apaterno = "Aguado"
empleado1.amaterno = "Mendez"
empleado1.edad = 27
empleado1.saludo()
