import { Router } from "express";
import passport from '../helpers/token/passportHelps.js';
import { limit } from "../helpers/limit/limit.js";
import { version } from "../config/variables/variables.js";

import { 
        medicamentosAll, 
        proveedoresAll,
        medicamentosCaducacion,
        medicamentosVencidos,
        proveedoresNombre,
        recetasMedicas,
        totalVentas,
        cantidadDinero,
        cantidadVentasRealizadas,
        expiracionMedicamentos,
        gananciaTotalProveedor,
        medicamentoMayorPrecio,
        medicamentosConMenosCantidad,
        medicamentosProveedor,
        promedioCompraMedicamentos,
        proveedorMenorUnidades,
        recetasPreescritas,
        totalProveedores,
      } from "../versiones/v1/consultas.js";

import { validateConsultasParams } from "../middleware/dtoConsultas.js";

const appConsultas = Router();

appConsultas.use(limit(), passport.authenticate("bearer", { session: false }));

// http://127.10.10.10:5010/consultas/medicamentosAll
appConsultas.get("/medicamentosAll", version({
    "1.0.0": medicamentosAll,
    "2.0.0": medicamentosAll  
  })
);

// http://127.10.10.10:5010/consultas/proveedoresAll
appConsultas.get("/proveedoresAll", version({
    "1.0.0": proveedoresAll,
    "2.0.0": proveedoresAll  
  })
);

// http://127.10.10.10:5010/consultas/medicamentosCaducacion
appConsultas.get("/medicamentosCaducacion", validateConsultasParams, version({
    "1.0.0": medicamentosCaducacion,
    "2.0.0": medicamentosCaducacion  
  })
);

// http://127.10.10.10:5010/consultas/medicamentosVencidos
appConsultas.get("/medicamentosVencidos", version({
    "1.0.0": medicamentosVencidos,
    "2.0.0": medicamentosVencidos  
  })
);

// http://127.10.10.10:5010/consultas/proveedoresNombre
appConsultas.get("/proveedoresNombre", version({
    "1.0.0": proveedoresNombre,
    "2.0.0": proveedoresNombre  
  })
);

// http://127.10.10.10:5010/consultas/recetasMedicas
appConsultas.get("/recetasMedicas", version({
    "1.0.0": recetasMedicas,
    "2.0.0": recetasMedicas  
  })
);

// http://127.10.10.10:5010/consultas/totalVentas
appConsultas.get("/totalVentas", version({
    "1.0.0": totalVentas,
    "2.0.0": totalVentas  
  })
);

// http://127.10.10.10:5010/consultas/cantidadDinero
appConsultas.get("/cantidadDinero", version({
    "1.0.0": cantidadDinero,
    "2.0.0": cantidadDinero  
  })
);

// http://127.10.10.10:5010/consultas/cantidadVentasRealizadas
appConsultas.get("/cantidadVentasRealizadas", version({
    "1.0.0": cantidadVentasRealizadas,
    "2.0.0": cantidadVentasRealizadas  
  })
);

// http://127.10.10.10:5010/consultas/expiracionMedicamentos
appConsultas.get("/expiracionMedicamentos", version({
    "1.0.0": expiracionMedicamentos,
    "2.0.0": expiracionMedicamentos  
  })
);

// http://127.10.10.10:5010/consultas/gananciaTotalProveedor
appConsultas.get("/gananciaTotalProveedor", version({
    "1.0.0": gananciaTotalProveedor,
    "2.0.0": gananciaTotalProveedor  
  })
);

// http://127.10.10.10:5010/consultas/medicamentoMayorPrecio
appConsultas.get("/medicamentoMayorPrecio", version({
    "1.0.0": medicamentoMayorPrecio,
    "2.0.0": medicamentoMayorPrecio  
  })
);

// http://127.10.10.10:5010/consultas/medicamentosConMenosCantidad
appConsultas.get("/medicamentosConMenosCantidad", version({
    "1.0.0": medicamentosConMenosCantidad,
    "2.0.0": medicamentosConMenosCantidad  
  })
);

// http://127.10.10.10:5010/consultas/medicamentosProveedor
appConsultas.get("/medicamentosProveedor", version({
    "1.0.0": medicamentosProveedor,
    "2.0.0": medicamentosProveedor  
  })
);

// http://127.10.10.10:5010/consultas/promedioCompraMedicamentos
appConsultas.get("/promedioCompraMedicamentos", version({
    "1.0.0": promedioCompraMedicamentos,
    "2.0.0": promedioCompraMedicamentos  
  })
);

// http://127.10.10.10:5010/consultas/proveedorMenorUnidades
appConsultas.get("/proveedorMenorUnidades", version({
    "1.0.0": proveedorMenorUnidades,
    "2.0.0": proveedorMenorUnidades  
  })
);

// http://127.10.10.10:5010/consultas/recetasPreescritas
appConsultas.get("/recetasPreescritas", version({
    "1.0.0": recetasPreescritas,
    "2.0.0": recetasPreescritas  
  })
);

// http://127.10.10.10:5010/consultas/totalProveedores
appConsultas.get("/totalProveedores", version({
    "1.0.0": totalProveedores,
    "2.0.0": totalProveedores  
  })
);

export default appConsultas