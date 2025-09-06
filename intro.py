#leer de consola

print("Ingresa tu nombre")
nombre=input("Ingresa tu nombre:\n")
print("Nombre: {}".format(nombre))

edad=int(input("Ingresa edad: "))
suma=int(edad)+5

print(suma)

#################################################
for i in range(1,11,2):
    print(i)

nombre = 'python'
nombre = nombre.upper()
nombre = nombre.lower()
nombre = nombre.capitalize()
for i in nombre:
    print(i)

##################################################
lista = ['Daniel', 'Alejandro', 'Daniel']
lista.insert(1, 'Alex')
lista.count('Daniel') #numero de veces que se repite un valor
lista.pop()
lista.remove('Alex')

numeros = [2,5,9,7,2,3]
print(numeros.sort(reverse=True)) #mayor a menor
##################################################
# from . import clase === import clase
# from archivo import (funcion1, funcion2, ...)
