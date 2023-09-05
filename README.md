# facturacionCampus_JhonAlmeida



### INSTALACION

1. Clonar el repositorio en su equipo

2. cuando ya lo tenga clonado, abrir la terminal y ejecutar el siguiente comando 

   ```
   npm install
   ```

3. Crear un archivo .env y en el colocar las siguientes variables de entorno 

```
MY_CONFIG = {"hostname": "127.10.10.10", "port": 5010}
MY_CONNECT = {"user": "Jhon", "password": "123", "database": "facturacionCampus_JhonAlmeida"}
MY_JWT = "asdasdsad"
```

4. Recordar que en el proyecto se encuentra el scrip de la base de datos

5. Para iniciar sesion ingresa la siguiente ruta en el header con el metodo **POST**

   `http://127.10.10.10:5010/login`

   **NOTA**: En el body colocar el usuario y la contraseña, ejemplo:

   ```
   {
     "User": "admin",
     "Password": "1"
   }
   ```

6. Los usuarios que tiene este proyecto son: 

   ```
   {
     "User": "admin",
     "Password": "1"
   }
   "Este usuario admite la version 2.0.0"
   {
     "User": "empleado",
     "Password": "2"
   }
   "Este usuario admite la version 1.0.0"
   ```

7.  Le va a generar un token, ese token por favor colocarlo en Headers del `Thunder-Client` y la versión a la que tiene permiso, ejemplo.

   ```
   Authorization 						"Token"
   Accept-version						2.0.0
   ```

   

**IMPORTANTE**: Una vez iniciada la sesión podrá consultar los endPoints que se encuentran a continuación



## NOTA:

No me deja conectar a la base de datos de mongo de Campus, la base de datos queda local

![error al conectar](./src/Screenshot%202023-09-05%20132625.png)



# ENDPOINTS

**GET**:

- *1. Obtener todos los medicamentos con menos de 50 unidades en stock*
  - http://127.10.10.10:5010/consultas/medicamentosAll
- *2. Listar los proveedores con su información de contacto en medicamentos*
  - http://127.10.10.10:5010/consultas/proveedoresAll
- *3. Medicamentos comprados al 'Proveedor A'*
  - http://127.10.10.10:5010/consultas/medicamentosCaducacion
- *4. Obtener recetas médicas emitidas después del 1 de enero de 2023*
  - http://127.10.10.10:5010/consultas/medicamentosVencidos
- *5. Total de ventas del medicamento 'Paracetamol'*
  - http://127.10.10.10:5010/consultas/proveedoresNombre
- *6. Medicamentos que caducan antes del 1 de enero de 2024*
  - http://127.10.10.10:5010/consultas/recetasMedicas
- *7. Total de medicamentos vendidos por cada proveedor*
  - http://127.10.10.10:5010/consultas/totalVentas
- *8. Cantidad total de dinero recaudado por las ventas de medicamentos*
  - http://127.10.10.10:5010/consultas/cantidadDinero
- *9. Recetas prescritas por el Dr. Martínez*
  - http://127.10.10.10:5010/consultas/cantidadVentasRealizadas
- *12. Número de medicamentos por proveedor*
  - http://127.10.10.10:5010/consultas/expiracionMedicamentos
- *17. Ganancia total por proveedor en 2023 (asumiendo un campo precioCompra en Compras)*
  - http://127.10.10.10:5010/consultas/gananciaTotalProveedor
- *18. Promedio de medicamentos comprados por venta*
  - http://127.10.10.10:5010/consultas/medicamentoMayorPrecio
- *19. Medicamentos que tienen menos de 50 unidades en stock*
  - http://127.10.10.10:5010/consultas/medicamentosConMenosCantidad
- *20. Cantidad de ventas realizadas por cada empleado en 2023*
  - http://127.10.10.10:5010/consultas/medicamentosProveedor
- *21. Obtener todos los medicamentos que expiren en 2024*
  - http://127.10.10.10:5010/consultas/promedioCompraMedicamentos
- *30. Número total de proveedores que suministraron medicamentos en 2023*
  - http://127.10.10.10:5010/consultas/proveedorMenorUnidades
- *31. Proveedores de los medicamentos con menos de 50 unidades en stock*
  - http://127.10.10.10:5010/consultas/recetasPreescritas
- *40. Medicamentos con un precio mayor a 50 y un stock menor a 100*
  - http://127.10.10.10:5010/consultas/totalProveedores