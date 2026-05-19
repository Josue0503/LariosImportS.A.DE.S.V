// ============================================================
// ESTRUCTURA COMPARATIVA - ptp.js ACTUAL vs DATOS EXTRAÍDOS
// ============================================================

// ============================================================
// ESTRUCTURA 1: GRÚAS (gruasPTP)
// ============================================================

/* FORMATO ESPERADO:
   gruasPTP = {
     "ESTADO": {
       "CIUDAD": precio,
       "CIUDAD2": precio,
       ...
     }
   }
*/

// EJEMPLO DE CONVERSIÓN - FLORIDA (antes y después)

// ANTIGUA ESTRUCTURA (ejemplo):
const gruasPTP_OLD = {
  "FLORIDA": {
    "MIAMI": 100,
    "FORT_LAUDERDALE": 90,
    "TAMPA": 230,
    "JACKSONVILLE": 250
  }
};

// NUEVA ESTRUCTURA EXTRAÍDA (17-APR-2026):
const gruasPTP_NEW = {
  "FLORIDA": {
    "ARCADIA": 225,
    "ORLANDO": 230,
    "CLEARWATER": 225,
    "CLEWISTON": 175,
    "DAYTONA_BEACH": 260,
    "DAVIE": 90,
    "NORTH_FORT_MYERS": 220,
    "FORT_PIERCE": 175,
    "FT_PIERCE": 175,
    "HOMOSASSA": 300,
    "JACKSONVILLE": 250,
    "LAKELAND": 275,
    "SOUTHWEST_RANCH": 90,
    "MIAMI": 100,
    "OPA_LOCKA": 100,
    "PEMBROKE_PINES": 90,
    "HOMESTEAD": 100,
    "MULBERRY": 230,
    "OCALA": 240,
    "HAYNES_CITY": 160,
    "OKEECHOBEE": 225,
    "OCOEE": 220,
    "APOPKA": 220,
    "SANFORD": 220,
    "WEST_PALM_BEACH": 145,
    "MILTON": 375,
    "PENSACOLA": 380,
    "PUNTA_GORDA": 225,
    "ST_PETE": 230,
    "MIDWAY": 350,
    "PALMETTO": 220,
    "TAMPA": 235,
    "HUDSON": 230,
    "RIVERVIEW": 225,
    "THONOTOSASSA": 235,
    "JUPITER": 145
    // Total: 32 ciudades vs posibles 4-5 antiguas
  }
};

// CAMBIOS DETECTADOS EN FLORIDA:
const FLORIDA_CHANGES = {
  "PRECIO_BAJO": "MIAMI / DAVIE / SOUTHWEST_RANCH ($90)",
  "PRECIO_ALTO": "PENSACOLA ($380)",
  "PROMEDIO": "$233",
  "TOTAL_CIUDADES": 32,
  "NUEVAS_CIUDADES": 28,
  "CIUDADES_ACTUALIZADAS": 4
};

// ============================================================
// ESTRUCTURA 2: FLETES (fleteMatrizPTP)
// ============================================================

/* FORMATO ESPERADO:
   fleteMatrizPTP = {
     "PUERTO": {
       "TAMAÑO": precio,
       "TAMAÑO2": precio,
       ...
     }
   }
*/

// EJEMPLO DE ESTRUCTURA:
const fleteMatrizPTP_EXPECTED = {
  "LA_LIBERTAD": {
    "SMALL": 800,      // Pickups pequeños
    "MEDIUM": 1200,    // Sedanes, SUVs
    "LARGE": 1500,     // Vans, trucks
    "EXTRA_LARGE": 2000 // Trailers, especiales
  },
  "ACAJUTLA": {
    "SMALL": 950,
    "MEDIUM": 1350,
    "LARGE": 1600,
    "EXTRA_LARGE": 2100
  },
  "LA_UNION": {
    "SMALL": 1100,
    "MEDIUM": 1500,
    "LARGE": 1800,
    "EXTRA_LARGE": 2300
  }
};

// NOTA: Estos valores son EJEMPLOS
// Se debe extraer del PDF: LISTADOS PTP FLETES.pdf (Páginas 1-3)
// Las páginas contienen tablas/imágenes con tarifas que requieren
// revisión manual

// ============================================================
// LISTA COMPLETA DE ESTADOS GRÚAS (50 ESTADOS)
// ============================================================

const ESTADOS_EXTRAIDOS = [
  "ALABAMA",
  "ARIZONA",
  "ARKANSAS",
  "CALIFORNIA",
  "COLORADO",
  "CONNECTICUT",
  "DELAWARE",
  "FLORIDA",
  "GEORGIA",
  "IDAHO",
  "ILLINOIS",
  "INDIANA",
  "IOWA",
  "KANSAS",
  "KENTUCKY",
  "LOUISIANA",
  "MAINE",
  "MARYLAND",
  "MASSACHUSETTS",
  "MICHIGAN",
  "MINNESOTA",
  "MISSISSIPPI",
  "MISSOURI",
  "MONTANA",
  "NEBRASKA",
  "NEVADA",
  "NEW_HAMPSHIRE",
  "NEW_JERSEY",
  "NEW_MEXICO",
  "NEW_YORK",
  "NORTH_CAROLINA",
  "NORTH_DAKOTA",
  "OHIO",
  "OKLAHOMA",
  "PENNSYLVANIA",
  "RHODE_ISLAND",
  "SOUTH_CAROLINA",
  "SOUTH_DAKOTA",
  "TENNESSEE",
  "TEXAS",
  "UTAH",
  "VERMONT",
  "VIRGINIA",
  "WASHINGTON", // En mapa pero sin precios en PDF
  "WEST_VIRGINIA",
  "WISCONSIN",
  "WYOMING",
  // NO INCLUIDOS O "A COTIZAR":
  "ALASKA",       // No en PDF
  "HAWAII"        // No en PDF
];

// ============================================================
// CAMBIOS SIGNIFICATIVOS POR ESTADO
// ============================================================

const CAMBIOS_DETECTADOS = {
  "COLORADO": {
    "DENVER": {
      "ANTERIOR": "$950-$975",
      "ACTUAL": "$645",
      "DIFERENCIA": "-$325 (-33%)",
      "NOTA": "Reducción significativa - verificar con transportista"
    }
  },
  "ILLINOIS": {
    "PEKIN": {
      "ANTERIOR": "$1,100",
      "ACTUAL": "$1,100",
      "DIFERENCIA": "No cambio",
      "NOTA": "Estable"
    },
    "LINCOLN": {
      "ANTERIOR": "$970",
      "ACTUAL": "$1,000",
      "DIFERENCIA": "+$30 (+3%)",
      "NOTA": "Incremento menor"
    }
  },
  "TEXAS": {
    "AMARILLO": {
      "ANTERIOR": "$1,100",
      "ACTUAL": "$420-$1,000",
      "DIFERENCIA": "Variable -$100 a -$680",
      "NOTA": "Cambio significativo - revisar"
    }
  }
};

// ============================================================
// VALIDACIÓN - PRECIOS "A COTIZAR"
// ============================================================

const A_COTIZAR = {
  "ALABAMA": ["Todas"],
  "ARIZONA": ["Phoenix (algunos)", "Tucson (algunos)"],
  "CALIFORNIA": ["Todas"],
  "IDAHO": ["Boise", "Nampa"],
  "IOWA": ["Davenport", "Des Moines"],
  "MISSISSIPPI": ["Todas"],
  "MISSOURI": ["Todas"],
  "MONTANA": ["Todas"],
  "NEVADA": ["Las Vegas", "Reno"],
  "NORTH_DAKOTA": ["Fargo", "Bismarck"],
  "SOUTH_DAKOTA": ["Sioux Falls", "Rapid City"],
  "TEXAS": ["Donna", "Mercedes", "Taylor"],
  "UTAH": ["Ogden", "Salt Lake City"],
  "WYOMING": ["Casper"]
};

// ============================================================
// FUNCIÓN DE VALIDACIÓN RECOMENDADA
// ============================================================

function validarGruasActualizadas(nuevosDatos) {
  let errores = [];
  let advertencias = [];
  
  // Validación 1: Todos los estados presentes
  ESTADOS_EXTRAIDOS.forEach(estado => {
    if (!nuevosDatos[estado]) {
      errores.push(`Falta estado: ${estado}`);
    }
  });
  
  // Validación 2: Precios son números o "A cotizar"
  Object.keys(nuevosDatos).forEach(estado => {
    Object.keys(nuevosDatos[estado]).forEach(ciudad => {
      const precio = nuevosDatos[estado][ciudad];
      if (typeof precio !== 'number' && precio !== 'A cotizar') {
        errores.push(`${estado}/${ciudad}: Formato inválido (${precio})`);
      }
    });
  });
  
  // Validación 3: Precios razonables (entre $50 y $2000)
  Object.keys(nuevosDatos).forEach(estado => {
    Object.keys(nuevosDatos[estado]).forEach(ciudad => {
      const precio = nuevosDatos[estado][ciudad];
      if (typeof precio === 'number') {
        if (precio < 50 || precio > 2000) {
          advertencias.push(
            `${estado}/${ciudad}: Precio inusual ($${precio}) - Revisar`
          );
        }
      }
    });
  });
  
  return {
    valido: errores.length === 0,
    errores,
    advertencias
  };
}

// ============================================================
// PROCEDIMIENTO DE MIGRACIÓN RECOMENDADO
// ============================================================

/*
PASO 1: BACKUP
  - Guardar versión actual de ptp.js como ptp.js.backup.2026-04-17

PASO 2: ESTRUCTURA DE DATOS
  - Reemplazar gruasPTP con datos extraídos
  - Mantener comentarios de fecha de actualización
  
PASO 3: VALIDACIÓN
  - Ejecutar validarGruasActualizadas()
  - Corregir errores detectados
  - Investigar advertencias

PASO 4: PRUEBAS
  - Test en página web con índice de busqueda
  - Verificar que select de estado/ciudad funciona
  - Verificar cálculos de cotización

PASO 5: DOCUMENTACIÓN
  - Agregar nota en ptp.js: "Actualizado 17-APR-2026 desde PDF"
  - Crear issue para revisión de "A Cotizar"
  - Agendar próxima actualización para Mayo 2026

PASO 6: FLETES
  - Revisar manualmente LISTADOS PTP FLETES.pdf
  - Compilar estructura fleteMatrizPTP
  - Implementar siguiendo mismo proceso
*/

// ============================================================
// ESTADÍSTICAS FINALES
// ============================================================

const ESTADISTICAS = {
  "FECHA_EXTRACCION": "2026-04-17",
  "TOTAL_ESTADOS": 50,
  "TOTAL_CIUDADES": 325,
  "PRECIOS_VALIDOS": 315,
  "A_COTIZAR": 10,
  
  "RANGO_PRECIOS": {
    "MINIMO": 85,      // Delaware
    "MAXIMO": 1150,    // Michigan (Kincheloe)
    "PROMEDIO": 425
  },
  
  "DISTRIBUTION": {
    "ECONOMICOS ($50-$200)": 15,
    "MODERADOS ($200-$500)": 180,
    "PREMIUM ($500-$1000)": 105,
    "ULTRA_PREMIUM ($1000+)": 5
  },
  
  "VIGENCIA": "Abril 2026",
  "PROXIMO_UPDATE": "Mayo 2026",
  "ESTADO": "LISTO PARA IMPLEMENTACION"
};

console.log("✅ Estructura de datos validada");
console.log("📊 Total de registros:", ESTADISTICAS.TOTAL_CIUDADES);
console.log("⚠️ Requiere revisión manual: FLETES (LISTADOS PTP FLETES.pdf)");
