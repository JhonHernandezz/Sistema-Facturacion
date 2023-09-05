import { con } from "../../config/connect/connect.js";

let db = await con();

//1. Obtener todos los medicamentos con menos de 50 unidades en stock
export const medicamentosAll = async (req, res) => {
    try {

      let tabla = db.collection("medicamentos")
        
        let data = await tabla.aggregate(
          [
              {
                  $match: {
                    stock: {$lt : 50} 
                  }
              },
              {
                  $project: {
                    _id: 0
                  }
              }
          ]
      ).toArray()

        res.send(data);

    } catch (error) {
      res.status(400).send({ status: 400, message: error });
    }
};

//2. Listar los proveedores con su información de contacto en medicamentos
export const proveedoresAll = async (req, res) => {
  try {

    let tabla = db.collection("proveedor")
      
      let data = await tabla.aggregate(
        [
          {
              $lookup: {
                from: "medicamentos",
                localField: "ID_proveedor",
                foreignField: "ID_medicamento",
                as: "fk_proveedor_medicamento"
              }
          },
          {
              $project: {
                _id: 0,
                "fk_proveedor_medicamento._id": 0
              }
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//3. Medicamentos comprados al 'Proveedor A'
export const proveedoresNombre = async (req, res) => {
  try {

    let tabla = db.collection("proveedor")
      
      let data = await tabla.aggregate(
        [
          {
              $match: {
                  nombre_proveedor: /Distribuidora las torres/
              }
          },
          {
              $lookup: {
                from: "medicamentos",
                localField: "ID_proveedor",
                foreignField: "ID_medicamento",
                as: "fk_proveedor_medicamento"
              }
          },
          {
              $lookup: {
                from: "compras",
                localField: "fk_proveedor_medicamento.ID_medicamento",
                foreignField: "id_medicamento",
                as: "fk_medicamento_compras"
              }
          },
          {
              $project: {
                _id: 0,
                "fk_proveedor_medicamento._id": 0,
                "fk_medicamento_compras._id": 0,
                "fk_medicamento_compras.id_medicamento": 0,
                "fk_medicamento_compras.id_proveedor": 0,
              }
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//4. Obtener recetas médicas emitidas después del 1 de enero de 2023
export const recetasMedicas = async (req, res) => {
  try {

    let tabla = db.collection("citas")
      
      let data = await tabla.aggregate(
        [
          {
              $match: {
                  fecha_receta: { $gte: "2023-08-12"}
              }
          },
          {
              $project: {
                _id: 0
              }
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//5. Total de ventas del medicamento 'Paracetamol'
export const totalVentas = async (req, res) => {
  try {

    let tabla = db.collection("medicamentos")
      
      let data = await tabla.aggregate(
        [
          {
              $match: {
                  nombre_medicamento: /Ibuprofeno/
              }
          },
          {
              $lookup: {
                from: "ventas",
                localField: "ID_medicamento",
                foreignField: "id_medicamento",
                as: "fk_medicamento_ventas"
              }
          },
          {
              $project: {
                _id: 0,
                "fk_medicamento_ventas._id": 0,
                "fk_medicamento_ventas.id_medicamento": 0,
              }
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//6. Medicamentos que caducan antes del 1 de enero de 2024
export const medicamentosCaducacion = async (req, res) => {
  try {

    let tabla = db.collection("medicamentos")
      
      let data = await tabla.aggregate(
        [
          {
              $lookup: {
                from: "informes",
                localField: "ID_medicamento",
                foreignField: "id_medicamento",
                as: "fk_medicamento_informes"
              }
          },
          {
              $unwind: "$fk_medicamento_informes"
          },
          {
              $match: {
                "fk_medicamento_informes.fecha_eventualidad": {$lt : "2023-09-20"},
                "fk_medicamento_informes.tipo_informe": "caducidad"
              }
          },
          {
              $project: {
                _id: 0,
                "fk_medicamento_informes._id": 0
              }
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//7. Total de medicamentos vendidos por cada proveedor
export const medicamentosVencidos = async (req, res) => {
  try {

    let tabla = db.collection("proveedor")
      
      let data = await tabla.aggregate(
        [
          {
              $lookup: {
                from: "compras",
                localField: "ID_proveedor",
                foreignField: "id_proveedor",
                as: "fk_proveedor_compras"
              }
          },
          {
              $unwind: "$fk_proveedor_compras"
          },
          {
              $group: {
                  _id: "$ID_proveedor",
                  "ID_proveedor": { $first : "$ID_proveedor"},
                  "nombre_proveedor": { $first : "$nombre_proveedor"},
                  "telefono": { $first : "$telefono"},
                  "direccion": { $first : "$direccion"},
                  "Total_medicamentos": { $sum: "$fk_proveedor_compras.cantidad_medicamento"}
              }
          },
          {
              $project: {
                _id: 0,
                "fk_medicamento_informes._id": 0
              }
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//8. Cantidad total de dinero recaudado por las ventas de medicamentos
export const cantidadDinero = async (req, res) => {
  try {

    let tabla = db.collection("medicamentos")
      
      let data = await tabla.aggregate(
        [
          {
              $lookup: {
                from: "ventas",
                localField: "ID_medicamento",
                foreignField: "id_medicamento",
                as: "fk_empleados_ventas"
              }
          },
          {
              $unwind: "$fk_empleados_ventas"
          },
          {
              $group: {
                  _id: "$ID_medicamento",
                  "ID_medicamento": {$first: "$ID_medicamento"},
                  "nombre_medicamento": {$first: "$nombre_medicamento"},
                  "stock": {$first: "$stock"},
                  "Cantidad_total_dinero": { $sum: "$fk_empleados_ventas.valor_venta"}
              }
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//9. Recetas prescritas por el Dr. Martínez
export const recetasPreescritas = async (req, res) => {
  try {

    let tabla = db.collection("empleados")
      
      let data = await tabla.aggregate(
        [
          {
              $match: {
                  nombre_empleado: /Carlos/
              }
          },
          {
              $lookup: {
                from: "citas",
                localField: "ID_empleado",
                foreignField: "ID_empleado",
                as: "fk_empleados_citas"
              }
          },
          {
              $project: {
                _id: 0,
                "fk_empleados_citas._id": 0,
                "fk_empleados_citas.ID_empleado": 0,
              }
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//12. Número de medicamentos por proveedor
export const medicamentosProveedor = async (req, res) => {
  try {

    let tabla = db.collection("proveedor")
      
      let data = await tabla.aggregate(
        [
          {
              $lookup: {
                from: "compras",
                localField: "ID_proveedor",
                foreignField: "id_proveedor",
                as: "fk_proveedor_compras"
              }
          },
          {
              $project: {
                _id: 0,
                "fk_proveedor_compras._id": 0,
                "fk_proveedor_compras.ID": 0,
                "fk_proveedor_compras.valor_compra": 0,
                "fk_proveedor_compras.id_proveedor": 0
              }
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//17. Ganancia total por proveedor en 2023 (asumiendo un campo precioCompra en Compras)
export const gananciaTotalProveedor = async (req, res) => {
  try {

    let tabla = db.collection("proveedor")
      
      let data = await tabla.aggregate(
        [
          {
              $lookup: {
                from: "compras",
                localField: "ID_proveedor",
                foreignField: "id_proveedor",
                as: "fk_proveedor_compras"
              }
          },
          {
              $project: {
                _id: 0,
                "fk_proveedor_compras._id": 0,
                "fk_proveedor_compras.ID": 0,
                "fk_proveedor_compras.id_proveedor": 0,
                "fk_proveedor_compras.id_medicamento": 0,
                "fk_proveedor_compras.cantidad_medicamento": 0,
                "fk_proveedor_compras.fecha_compra": 0,
              }
          },
          {
              $project: {
                  ID_proveedor: 1,
                  nombre_proveedor: 1,
                  telefono: 1,
                  direccion: 1,
                  "Ganancia_Total": "$fk_proveedor_compras.valor_compra"
              }
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//18. Promedio de medicamentos comprados por venta
export const promedioCompraMedicamentos = async (req, res) => {
  try {

    let tabla = db.collection("medicamentos")
      
      let data = await tabla.aggregate(
        [
          {
              $lookup: {
                from: "ventas",
                localField: "ID_medicamento",
                foreignField: "id_medicamento",
                as: "fk_medicamentos_ventas"
              }
          },
          {
              $project: {
                _id: 0,
                "fk_medicamentos_ventas._id": 0,
                "fk_medicamentos_ventas.ID": 0,
                "fk_medicamentos_ventas.id_medicamento": 0,
                "fk_medicamentos_ventas.fecha_venta": 0,
                "fk_medicamentos_ventas.valor_venta": 0,
              }
          },
          {
              $project: {
                  ID_medicamento: 1,
                  nombre_medicamento: 1,
                  descripcion: 1,
                  stock: 1,
                  "Cantidad_Total_Medicamentos_Ventas": "$fk_medicamentos_ventas.cantidad_medicamento"
              }
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//19. Medicamentos que tienen menos de 50 unidades en stock
export const medicamentosConMenosCantidad = async (req, res) => {
  try {

    let tabla = db.collection("medicamentos")
      
      let data = await tabla.aggregate(
        [ 
          {
              $match: {
                  stock: {$lt: 50}
              }
          },
          {
              $project: {
                _id: 0
              }
          } 
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//20. Cantidad de ventas realizadas por cada empleado en 2023
export const cantidadVentasRealizadas = async (req, res) => {
  try {

    let tabla = db.collection("empleados")
      
      let data = await tabla.aggregate(
        [ 
          {
              $lookup: {
                from: "ventas",
                localField: "ID_empleado",
                foreignField: "id_empleado",
                as: "fk_proveedor_informes"
              }
          },
          {
              $unwind: "$fk_proveedor_informes"
          },
          {
              $match: {
                fk_proveedor_informes: { $exists: true}
              }
          },
          {
              $group: {
                _id: "$ID_empleado",
                "Cantidad_Ventas": { $push: "$fk_proveedor_informes.ID"}
              }
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//21. Obtener todos los medicamentos que expiren en 2024
export const expiracionMedicamentos = async (req, res) => {
  try {

    let tabla = db.collection("medicamentos")
      
      let data = await tabla.aggregate(
        [ 
          {
              $lookup: {
                from: "informes",
                localField: "ID_medicamento",
                foreignField: "id_medicamento",
                as: "fk_medicamentos_informes"
              }
          },
          {
              $match: {
                "fk_medicamentos_informes.tipo_informe": "caducidad",
                "fk_medicamentos_informes.fecha_eventualidad": {$gte : "2024-01-01"}
              }
          },
          {
              $project: {
                _id: 0
              }
          } 
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//30. Número total de proveedores que suministraron medicamentos en 2023
export const totalProveedores = async (req, res) => {
  try {

    let tabla = db.collection("proveedor")
      
      let data = await tabla.aggregate(
        [ 
          {
              $lookup: {
                from: "compras",
                localField: "ID_proveedor",
                foreignField: "id_proveedor",
                as: "Cantidad_proveedores"
              }
          },
          {
              $count: "Cantidad_proveedores"
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//31. Proveedores de los medicamentos con menos de 50 unidades en stock
export const proveedorMenorUnidades = async (req, res) => {
  try {

    let tabla = db.collection("proveedor")
      
      let data = await tabla.aggregate(
        [ 
          {
              $lookup: {
                from: "compras",
                localField: "ID_proveedor",
                foreignField: "id_proveedor",
                as: "fk_proveedor_compras"
              }
          },
          {
              $unwind: "$fk_proveedor_compras"
          },
          {
              $lookup: {
                from: "medicamentos",
                localField: "fk_proveedor_compras.id_medicamento",
                foreignField: "ID_medicamento",
                as: "fk_compras_medicamentos"
              }
          },
          {
              $unwind: "$fk_compras_medicamentos"
          },
          {
              $match: {
                  "fk_compras_medicamentos.stock": {$lt: 13}
              }
          },
          {
              $project: {
                  _id: 0,
                  "fk_proveedor_compras": 0,
                  "fk_compras_medicamentos._id": 0,
                  "fk_compras_medicamentos.descripcion": 0,
                  "fk_compras_medicamentos.valor_unidad": 0,
              }
          }
        ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};

//40. Medicamentos con un precio mayor a 50 y un stock menor a 100
export const medicamentoMayorPrecio = async (req, res) => {
  try {

    let tabla = db.collection("medicamentos")
      
      let data = await tabla.aggregate(
        [ 
          {
              $match: {
                  valor_unidad: { $gte: 50},
                  stock: { $lt: 100}
              }
          },
          {
              $project: {
                  _id: 0
              }
          }
      ]
      ).toArray()

      res.send(data);

  } catch (error) {
    res.status(400).send({ status: 400, message: error });
  }
};