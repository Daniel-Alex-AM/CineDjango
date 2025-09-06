import pyodbc as db
import pandas as pd
import configparser
import os

# Tomar variables desde archivo con CONFIGPARSER 
config = configparser.ConfigParser()
config.read(os.path.join(os.path.dirname(__file__), 'webconfig.cs'))
driverName = config.get("Cadena", "driverName")
srver = config.get("Cadena", "srver")
bdname = config.get("Cadena", "bdname")
usr = config.get("Cadena", "usr")
pwd = config.get("Cadena", "pwd")

# driverName = "ODBC Driver 18 for SQL Server"
# srver = "DESKTOP-DN1ULEK"
# bdname = "ReservaCine"
# usr = "sa" #system administrator
# pwd = "root"

ruta="archivopytjon.txt"
file = open(ruta, "w", encoding='utf-8')

cnx = db.connect("Driver={};server={};database={};TrustServerCertificate=yes;UID={};PWD={}".format(driverName,srver,bdname,usr,pwd))
cursor = cnx.cursor()

################# SELECT ##############
def select():
    cursor.execute("select idpais, nombre from pais")
    for fila in cursor:
        for celda in fila:
            if isinstance(celda, int):
                file.write(str(celda))
            else:
                file.write(str(celda))
            file.write("-")
            print(celda)
        file.write("\n")
        print("_________________")

    file.close()

################### PROCEDURE ##########
def procedure():
    print("---PROCEDURE---")
    
    cursor.execute("uspListarPais")
    for fila in cursor:
        for celda in fila:
            print(celda)
        print("_________________")

    cursor.execute("uspCantidadPais")
    print(cursor.fetchval()) # FETCHVAL obtiene solo el primer valor
    
    print("---enviar parametro a procedure---")
    cursor.execute("exec filtrarPais @id={0}".format("1")) #o es el index de valores en format()
    for fila in cursor:
        print(fila)

################### PANDAS ##########
def pandas():
    print("---PANDAS---")
    df = pd.read_sql_query("select * from cine", cnx)#, index_col="IDPAIS")
    #df.set_index("IDPAIS")
    print(df)
    file = open("dataframe.txt", "w", encoding="utf-8")
    file.write(str(df))
    file.close()

    ### CSV
    archivocsv = "csvpandas.csv"
    df.to_csv(archivocsv)

    ## EXCEL
    archivoexcel = "excelpandas.xlsx"
    df.to_excel(archivoexcel)

    ### HTML
    archivohtml = "htmlpandas.html"
    df.to_html(archivohtml, index=False)

    ### JSON
    jsontypes = ("split", "table", "values", "records")
    for tj in jsontypes:
        df.to_json("jsonpandas_{}.json".format(tj), orient=tj)



# select()
#procedure()
pandas()