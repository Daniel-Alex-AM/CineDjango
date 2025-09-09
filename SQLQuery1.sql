DROP PROCEDURE [dbo].[uspEliminarPelicula];
DROP PROCEDURE [dbo].[uspEliminarCine];
DROP PROCEDURE [dbo].[uspEliminarPais];
DROP PROCEDURE [dbo].[uspListarSala];
DROP PROCEDURE [dbo].[uspFiltrarSalaPorNombre];
DROP PROCEDURE [dbo].[uspListarFuncion];
DROP PROCEDURE [dbo].[uspFiltrarFuncion];
DROP PROCEDURE [dbo].[uspRecuperarSala];
DROP PROCEDURE [dbo].[uspGuardarSala];
DROP PROCEDURE [dbo].[uspGuardarFuncion];
DROP PROCEDURE [dbo].[uspListarPais];
DROP PROCEDURE [dbo].[uspCantidadPais];
DROP PROCEDURE [dbo].[sp_upgraddiagrams];
DROP PROCEDURE [dbo].[uspFiltrarPais];
DROP PROCEDURE [dbo].[sp_helpdiagrams];
DROP PROCEDURE [dbo].[sp_helpdiagramdefinition];
DROP PROCEDURE [dbo].[sp_creatediagram];
DROP PROCEDURE [dbo].[sp_renamediagram];
DROP PROCEDURE [dbo].[sp_alterdiagram];
DROP PROCEDURE [dbo].[sp_dropdiagram];
DROP PROCEDURE [dbo].[uspListarTipoCine];
DROP PROCEDURE [dbo].[uspFiltrarPaisDjango];
DROP PROCEDURE [dbo].[uspFiltrarTipoCineDjango];
DROP PROCEDURE [dbo].[uspListarCine];
DROP PROCEDURE [dbo].[uspListarPersona];
DROP PROCEDURE [dbo].[listarPersona];
DROP PROCEDURE [dbo].[uspFiltrarCineDjango];
DROP PROCEDURE [dbo].[uspFiltrarPersonaDjango];
DROP PROCEDURE [dbo].[uspGuardarPais];
DROP PROCEDURE [dbo].[uspRecuperarPais];
DROP PROCEDURE [dbo].[uspRecuperarCine];
DROP PROCEDURE [dbo].[uspGuardarCine];
DROP PROCEDURE [dbo].[uspGuardarPersona];
DROP PROCEDURE [dbo].[uspListarSexo];
DROP PROCEDURE [dbo].[uspRecuperarPersona];
DROP PROCEDURE [dbo].[uspListarPelicula];
DROP PROCEDURE [dbo].[uspListarGenero];
DROP PROCEDURE [dbo].[uspListarTipoCensura];
DROP PROCEDURE [dbo].[uspRecuperarPelicula];
DROP PROCEDURE [dbo].[uspGuardarPelicula];

SELECT 'DROP PROCEDURE [' + SCHEMA_NAME(p.schema_id) + '].[' + p.NAME + '];'
FROM sys.procedures p ;

alter procedure uspListarPais
as
begin
select IDPAIS as IDPAIS, NOMBRE as NOMBRE
from pais
end

exec uspListarPais

create procedure uspCantidadPais
as begin
select count(*)
from pais
end

exec uspCantidadPais


create procedure filtrarPais
@id int /*ESTE ES UN PARAMETRO QUE RECIBE EL PROCEDURE*/
as
begin
select *
from pais
where idpais=@id
end

exec filtrarPais 1 /*"1" es el parametro*/

/****************************************************/
create procedure listarTipoCine
as
begin
	select idtipocine,nombre
	from tipocine
end

exec listarTipoCine
/****************************************************/
alter procedure filtrarPaisDjango
@nombre varchar(100) /*parametro que recibe*/
as
declare @cadena varchar(100) /*variable local*/
begin

set @cadena=ltrim(rtrim(@nombre)) /*borra espacios a right/left*/
if @cadena=''
  exec uspListarPais
else
  select IDPAIS as IDPAIS, NOMBRE as NOMBRE
  from PAIS
  where upper(NOMBRE) like concat('%',upper(@cadena),'%')

end

exec filtrarPaisDjango 'x';

/****************************************************/
USE ReservaCine;
SELECT * FROM TIPOCINE;
/*IDTIPOCINE | NOMBRE | BHABILITADO*/

create procedure filtrarTipoCine
@nombre varchar(100) /*parametro que recibe*/
as
declare @cadena varchar(100) /*variable local*/
begin

set @cadena=ltrim(rtrim(@nombre)) /*borra espacios a right/left*/
if @cadena=''
  exec listarTipoCine
else
  select IDTIPOCINE as IDTIPOCINE, NOMBRE as NOMBRE
  from TIPOCINE
  where upper(NOMBRE) like concat('%',upper(@cadena),'%')

end
/****************************************************/
create procedure listarCine
as
begin
select IDCINE as IDCINE, NOMBRE as NOMBRE, DIRECCION as DIRECCION
from CINE
end

exec listarCine

/****************************************************/
/*103 es Dia Mes Año*/
select * from persona
select convert(varchar, FECHANAC, 103) from persona

create procedure listarPersona
as
begin
	select IDPERSONA as IDPERSONA, DNI as DNI, NOMBRE+' '+APPATERNO+' '+APMATERNO as NOMBRECOMPLETO ,
		convert(varchar, FECHANAC, 103) as FECHANACIMIENTO
	from persona
end

exec listarPersona

/****************************************************/
select * from cine

alter procedure filtrarCine
@nombre varchar(100) /*parametro que recibe*/
as
declare @cadena varchar(100) /*variable local*/
begin

set @cadena=ltrim(rtrim(@nombre)) /*borra espacios a right/left*/
if @cadena=''
  exec listarCine
else
  select IDCINE as IDCINE, NOMBRE as NOMBRE, DIRECCION as DIRECCION
  from CINE
  where upper(NOMBRE) like concat('%',upper(@cadena),'%')

end

exec filtrarCine 'pa'
/****************************************************/
select * from persona

create procedure filtrarPersona
@nombre varchar(100)
as
declare @cadena varchar(100)
begin

set @cadena=ltrim(rtrim(@nombre))
if @cadena=''
	exec listarPersona
else
	select DNI as DNI, NOMBRE+' '+APPATERNO+' '+APMATERNO as NOMBRECOMPLETO ,
		convert(varchar, FECHANAC, 103) as FECHANACIMIENTO
	from persona
	where upper(NOMBRE+' '+APPATERNO+' '+APMATERNO) LIKE concat('%',upper(@cadena),'%')

end

exec filtrarPersona 'es'
/****************************************************/
select * from pais

create procedure guardarPais
@nombre varchar(100),
@idpais int
as
begin
if @idpais=''
	insert into PAIS (NOMBRE,BHABILITADO) values (@nombre,1)
else 
	update PAIS
	SET NOMBRE=@nombre
	WHERE IDPAIS = @idpais
end

exec guardarPais 'Wonder', ''

select * from PAIS

/****************************************************/
create procedure recuperarPais
@idpais int
as
begin
	select iDPAIS, NOMBRE
	from pais
	where IDPAIS=@idpais
end
/****************************************************/

alter procedure guardarCine
@idcine int,
@nombre varchar(100),
@direccion varchar(100),
@idtipocine int,
@fechaapertura date

as
begin
if @idcine=''
	insert into CINE (NOMBRE,DIRECCION,IDTIPOCINE,FECHAAPERTURA,BHABILITADO)
	values (@nombre,@direccion, @idtipocine,@fechaapertura, 1)
else 
	update CINE
	SET NOMBRE=@nombre, DIRECCION=@direccion, IDTIPOCINE=@idtipocine, FECHAAPERTURA=@fechaapertura
	WHERE IDCINE = @idcine
end

delete from cine
where NOMBRE=''

/****************************************************/
/* 103 es dd/mm/yyyy */
alter procedure recuperarCine
@idcine int
as
begin
	select IDCINE as IDCINE, NOMBRE as NOMBRE, DIRECCION as DIRECCION, IDTIPOCINE as IDTIPOCINE, isnull(convert(varchar, FECHAAPERTURA, 103), '') as FECHAAPERTURA
	from CINE
	where IDCINE=@idcine
end

select * from CINE

/****************************************************/
use ReservaCine;
select * from persona

alter procedure guardarPersona
@idpersona int,
@dni varchar(10),
@nombre varchar(50),
@apaterno varchar(50),
@amaterno varchar(50),
@fechanac date,
@direccion varchar(100),
@telefonofijo varchar(10),
@telefonocelular varchar(10),
@idsexo int

as
begin
if @idpersona=''
	insert into persona(DNI, NOMBRE, APPATERNO, APMATERNO, FECHANAC, DIRECCION, 
						TELEFONOFIJO, TELEFONOCELULAR, IDSEXO, BHABILITADO)
			values(@dni, @nombre, @apaterno, @amaterno, @fechanac, @direccion, 
					@telefonofijo, @telefonocelular, @idsexo, 1)

else
	update PERSONA
	set DNI=@dni, NOMBRE=@nombre, APPATERNO=@apaterno, APMATERNO=@amaterno,
		FECHANAC=@fechanac, DIRECCION=@direccion, TELEFONOFIJO=@telefonofijo,
		TELEFONOCELULAR=@telefonocelular, IDSEXO=@idsexo
	WHERE IDPERSONA=@idpersona

end

select * from persona where nombre='Alex'

/****************************************************/
create procedure listarSexo
as
begin

select IDSEXO, NOMBRE
from SEXO

end
/****************************************************/
alter procedure recuperarPersona
@idpersona int

as
begin
/*23 es yyyy-mm-dd*/
select IDPERSONA as IDPERSONA, DNI as DNI, NOMBRE as NOMBRE, APPATERNO as APPATERNO, APMATERNO as APMATERNO, 
		convert(varchar,FECHANAC,23) as FECHANAC, DIRECCION as DIRECCION, TELEFONOFIJO as TELEFONOFIJO, TELEFONOCELULAR as TELEFONOCELULAR, IDSEXO as IDSEXO
	from PERSONA
	WHERE IDPERSONA=@idpersona
end

exec recuperarPersona 1


DELETE FROM PERSONA
where NOMBRE=''
/**************************************************************************************************/
/***********************************      JOIN   **************************************************/
/**************************************************************************************************/

ALTER procedure listarPelicula
as
begin
	select p.IDPELICULA, p.TITULO, g.NOMBRE as NOMBREGENERO, pa.NOMBRE as NOMBREPAIS, tc.NOMBRE as NOMBRETIPOCENSURA
	from PELICULA p inner join GENERO g
	on p.IDGENERO = g.IDGENERO
	inner join PAIS pa
	on p.IDPAIS = pa.IDPAIS
	inner join TIPOCENSURA tc
	on p.IDTIPOCENSURA = tc.IDTIPOCENSURA
	where p.BHABILITADO = 1


end

select * from PELICULA
select * from TIPOCENSURA

exec listarPelicula


/**********************************************************/
create procedure listarGenero
as
begin

	select IDGENERO, NOMBRE
	from GENERO

end


create procedure listarTipoCensura
as
begin

	select IDTIPOCENSURA, NOMBRE
	from TIPOCENSURA

end

exec listarGenero
exec listarTipoCensura

/***************************************************/
ALTER procedure recuperarPelicula
@idpelicula int

as
begin

	select p.*, convert(varchar, p.FECHAESTRENO, 103) as FECHAESTRENOCADENA
	from PELICULA p
	where IDPELICULA = @idpelicula

end


alter procedure guardarPelicula
@idpelicula int,
@titulo varchar(100),
@idgenero int,
@idpais int,
@sinopsis varchar(1000),
@duracion int,
@idtipocensura int,
@foto varchar(max),
@fechaestreno date

as
begin

	if @idpelicula=''
		insert into PELICULA(TITULO,IDGENERO,IDPAIS,SINOPSIS,DURACION,IDTIPOCENSURA,FOTO,FECHAESTRENO, BHABILITADO)
		values(@titulo, @idgenero, @idpais, @sinopsis, @duracion, @idtipocensura, @foto, @fechaestreno, 1)

	else
		update PELICULA 
		set TITULO=@titulo,IDGENERO=@idgenero,IDPAIS=@idpais,SINOPSIS=@sinopsis,DURACION=@duracion,IDTIPOCENSURA=@idtipocensura,FOTO=@foto,FECHAESTRENO=@fechaestreno
		where IDPELICULA=@idpelicula

end

exec guardarPelicula 

select * from PELICULA




select * from PAIS

update PELICULA
set IDPAIS=11
where IDPELICULA = 5

/*************************************************/
CREATE PROCEDURE eliminarPelicula
@idpelicula int

as
begin
	update PELICULA
	set BHABILITADO = 0
	WHERE IDPELICULA=@idpelicula
end

CREATE PROCEDURE eliminarCine
@idcine int
as
begin

	DELETE FROM CINE
	WHERE IDCINE = @idcine

end

select * from CINE


/************************************************/
create procedure eliminarPais
@idpais int
as
begin
	DELETE FROM PAIS
	WHERE IDPAIS=@idpais
end

use ReservaCine

/***************************************************/
select * from SALA

CREATE PROCEDURE listarSala
as
begin
	SELECT s.IDSALA, s.NOMBRE as NOMBRESALA, c.NOMBRE as NOMBRECINE, s.NUMEROCOLUMNAS, s.NUMEROFILAS
	FROM SALA s inner join CINE c
	on s.IDCINE = c.IDCINE
	WHERE s.BHABILITADO = 1
end

ALTER PROCEDURE filtrarSalaNombre
@idcine int
as
begin

if @idcine=0
	exec listarSala
else
	SELECT s.IDSALA, s.NOMBRE as NOMBRESALA, c.NOMBRE as NOMBRECINE, s.NUMEROCOLUMNAS, s.NUMEROFILAS
	FROM SALA s inner join CINE c
	on s.IDCINE = c.IDCINE
	WHERE s.BHABILITADO = 1 and s.IDCINE = @idcine
end

exec filtrarSalaNombre 0

/*********************************/
select * from FUNCION

alter procedure listarFuncion
as
begin

	SELECT f.IDFUNCION, convert(varchar, f.FECHAFUNCION, 23) as FECHAFUNCION, c.NOMBRE as CINE, p.TITULO as PELICULA, s.NOMBRE as SALA
	FROM FUNCION f inner join PELICULA p
	on f.IDPELICULA = p.IDPELICULA
	inner join CINE c
	on f.IDCINE = c.IDCINE
	inner join SALA s
	on f.IDSALA = s.IDSALA

end

EXEC listarFuncion


alter procedure filtrarFuncion
@idpelicula int
as
begin
	if @idpelicula=0
			SELECT f.IDFUNCION, convert(varchar, f.FECHAFUNCION, 23) as FECHAFUNCION, c.NOMBRE as CINE, p.TITULO as PELICULA, s.NOMBRE as SALA
			FROM FUNCION f inner join PELICULA p
			on f.IDPELICULA = p.IDPELICULA
			inner join CINE c
			on f.IDCINE = c.IDCINE
			inner join SALA s
			on f.IDSALA = s.IDSALA
			WHERE f.BHABILITADO = 1
	else
		SELECT f.IDFUNCION, convert(varchar, f.FECHAFUNCION, 23) as FECHAFUNCION, c.NOMBRE as CINE, p.TITULO as PELICULA, s.NOMBRE as SALA
		FROM FUNCION f inner join PELICULA p
		on f.IDPELICULA = p.IDPELICULA
		inner join CINE c
		on f.IDCINE = c.IDCINE
		inner join SALA s
		on f.IDSALA = s.IDSALA
		WHERE f.BHABILITADO = 1 and p.IDPELICULA = @idpelicula
end


select * from PELICULA
WHERE IDPELICULA = 2

select * from SALA

exec filtrarFuncion 2


update FUNCION
SET BHABILITADO = 1
WHERE IDFUNCION = 7


/*********************************************************/
create procedure recuperarSala
@idsala int
as
begin
	SELECT *
	FROM SALA
	WHERE IDSALA = @idsala

end



create procedure guardarSala
@idsala int,
@idcine int,
@numerofilas int,
@numerocolumnas int,
@nombre varchar(100)
as
begin

	declare @total int
	set @total = @numerofilas * @numerocolumnas

	if @idsala =''
		insert into SALA(IDCINE, NUMBUTACAS, NUMEROCOLUMNAS, NUMEROFILAS, NOMBRE, BHABILITADO)
		VALUES(@idcine, @total, @numerocolumnas, @numerofilas, @nombre, 1)

	else
		update SALA
		SET IDCINE=@idcine, NUMEROFILAS = @numerofilas, NUMEROCOLUMNAS=@numerocolumnas, NUMBUTACAS=@total, NOMBRE=@nombre
		WHERE IDSALA = @idsala
end

select * from sala

/****************************************************************************************/
SELECT * FROM BUTACA
SELECT * FROM SALA WHERE IDSALA=8
SELECT * FROM FUNCION WHERE IDFUNCION=21
DELETE FROM BUTACA

EXEC guardarFuncion 0, '15/02/2025 12:00', 2, 2, 8 

alter procedure guardarFuncion
@idfuncion int,
@fechafuncion datetime,
@idpelicula int,
@idcine int,
@idsala int

as
begin

	declare @totalbutacas int
	declare @numcols int
	declare @numrows int
	declare @idfuncionnew int
	declare @contador int --idbutaca
	declare @indexcol int
	declare @indexrow int
	set @contador = 1 --valor inicial
	set @indexcol = 1
	set @indexrow = 1

		select @totalbutacas = NUMBUTACAS, @numcols = NUMEROCOLUMNAS, @numrows = NUMEROFILAS
		from SALA
		WHERE IDSALA = @idsala

	begin transaction /*INICIO DE TRANSACCION*/
	begin try	
		if @idfuncion = 0
			begin
				INSERT INTO FUNCION(FECHAFUNCION, IDPELICULA, IDCINE, IDSALA,BHABILITADO)
				VALUES(@fechafuncion, @idpelicula, @idcine, @idsala, 1)
				set @idfuncionnew=@@IDENTITY
				/*COMMIT*/

				WHILE @indexcol <= @numcols
					begin
						set @indexrow = 1
						while @indexrow <= @numrows
							begin
								INSERT INTO BUTACA(IDFUNCION, IDBUTACA, INDICEFILA, INDICECOLUMNA, BLIBRE, BHABILITADO)
								VALUES(@idfuncionnew, @contador, @indexrow, @indexcol, 1, 1)

								set @indexrow = @indexrow+1
								set @contador = @contador+1
							end

						set @indexcol = @indexcol+1
					end
			/*COMMIT*/
			end
		else
			begin
				UPDATE FUNCION
				SET IDPELICULA = @idpelicula, FECHAFUNCION=@fechafuncion
				WHERE IDFUNCION = @idfuncion
			/*COMMIT*/ /*CONFIRMAR CAMBIOS DE TRANSACION*/
			end
	
	
	COMMIT TRANSACTION --CONFIRMA LOS CAMBIOS
	select 1 -- devolver 1
	end try
	/*select @totalbutacas, @numcols*/

	begin catch
		ROLLBACK TRANSACTION
		select 0 --devolver 0 si error
	end catch
end

SELECT * FROM FUNCION
SELECT * FROM BUTACA
SELECT * FROM SALA

/********************************************************/
create procedure llenarSala
@idcine int
as
begin

	SELECT IDSALA, NOMBRE
	FROM SALA
	WHERE IDCINE = @idcine

end

EXEC llenarSala 2

/********************************************************************************/
create procedure recuperarFuncion
@idfuncion int

as
begin
	select IDFUNCION, convert(varchar,FECHAFUNCION,126) as FECHAFUNCION, IDPELICULA
	from FUNCION
	where IDFUNCION = @idfuncion
end

/*FECHAFUNCION 2019-05-13 20:43:14.740
-> convert 126 2019-05-13T20:43:14.740 (Este formato es del datetime local de JS)*/

exec recuperarFuncion 7

/******************************************************/
-- ELIMINACION LOGICA
create procedure eliminarSala
@idsala int

AS
BEGIN
	UPDATE SALA
	SET BHABILITADO = 0
	WHERE IDSALA = @idsala
END

-- ELIMINACION FISICA
create procedure eliminarFuncion
@idfuncion int

AS
BEGIN
	DELETE FROM FUNCION
	WHERE IDFUNCION = @idfuncion
END

delete from butaca where IDFUNCION=30

select * from BUTACA

---------------------------------------------------------------------------------
create procedure recuperarButacas
@idfuncion int
as
begin
	SELECT *
	FROM BUTACA
	WHERE IDFUNCION = @idfuncion
	ORDER BY INDICEFILA ASC, INDICECOLUMNA ASC
end

exec recuperarButacas 29



UPDATE BUTACA
SET BLIBRE = 0
WHERE INDICEFILA = 1