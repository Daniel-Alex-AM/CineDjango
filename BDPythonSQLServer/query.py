import pandas as pd
import pyodbc as db
import configparser
import os

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
        return data