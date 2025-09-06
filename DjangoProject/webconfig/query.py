import pandas as pd
import pyodbc as db
import configparser
import os
import json

class SQL:
    def __init__(self):
        config = configparser.ConfigParser()
        config.read(os.path.join(os.path.dirname(__file__), 'webconfig.cs'))
        driverName = config.get("Cadena", "driverName")
        srver = config.get("Cadena", "srver")
        bdname = config.get("Cadena", "bdname")
        usr = config.get("Cadena", "usr")
        pwd = config.get("Cadena", "pwd")

        self.Cadena="Driver={};server={};database={};TrustServerCertificate=yes;UID={};PWD={}"\
            .format(driverName,srver,bdname,usr,pwd)
        
    def listar(self, consulta):
        cnx = db.connect(self.Cadena)
        df = pd.read_sql_query(consulta, cnx)
        data = df.to_html(index=False)
        cnx.close()
        return data
    
    def listarJSON(self, consulta):
        cnx = db.connect(self.Cadena)
        df = pd.read_sql_query(consulta, cnx)
        data = df.to_json(index=False, orient="records") #este data es String
        cnx.close()
        return json.loads(data) # convertir string a objeto json
    

    def listarJSONWeb(self, consulta):
        cnx = db.connect(self.Cadena)
        df = pd.read_sql_query(consulta, cnx)
        data = df.to_json(index=False, orient="records") #este data es String
        cnx.close()
        return data # convertir string a objeto json
    
    """
    def enviarPost(self, consulta):
        cnx = db.connect(self.Cadena)
        cursor = cnx.cursor()
        numregafectados = cursor.execute(consulta).rowcount #si es 0 hay un error
        cursor.commit()
        cnx.close()
        return numregafectados
    """
    def enviarPost(self, consulta):
        try:
            cnx = db.connect(self.Cadena)
            cursor = cnx.cursor()
            numregafectados = cursor.execute(consulta).rowcount #si es 0 hay un error
            cursor.commit()
            cnx.close()
        except Exception as error:
            #numregafectados="Error: "+str(error)
            print(error)
            numregafectados = 0
        return numregafectados
    

    def enviarTransaccion(self, consulta):
        try:
            cn = db.connect(self.Cadena)
            cursor = cn.cursor()
            cursor.execute(consulta)

            registrosAfectados = cursor.fetchval()
            cursor.commit()
            cn.close()
            return registrosAfectados
        except Exception as error:
            registrosAfectados = "Error: "+str(error)

        return registrosAfectados




