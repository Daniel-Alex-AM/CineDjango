import query

odasql = query.SQL()
rpta = odasql.listar("select * from pais")
print(rpta)