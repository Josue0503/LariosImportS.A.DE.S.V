const fleteMatrizPTP = {
    "TEXAS": {
        "Sedan Hasta 15'": 1050,
        "Sedan Excep. Hasta 16'": 1075,
        "SUV Hasta 15'": 1075,
        "SUV Excep. Hasta 16'": 1335,
        "Pickup Sencillo Hasta 16'": 1335,
        "PickUp Xcab/Mini Van Hasta 17'": 1405,
        "17'1\" Hasta 17'3\"": 1525,
        "17'4\" Hasta 18'11\"": 1680,
        "Sobredimensionados 19' Hasta 21'": 1955,
        "Moto en Piso Hasta 7'00\"": 475,
        "Moto en Piso Desde 7'1\" y Up": 910,
        "Moto en PickUp": 450,
        "Carga Dentro de Vehículos": 175
    },
    "FLORIDA": {
        "Sedan Hasta 15'2\"": 830,
        "Sedan Excep. Hasta 16'": 905,
        "SUV Hasta 15'": 975,
        "SUV Excep. Hasta 16'": 995,
        "Pickup Sencillo Hasta 16'": 995,
        "PickUp Xcab/Mini Van Hasta 17'": 1325,
        "PickUp XCab/Double Cab Hasta 18'": 1415,
        "PickUp Full Size Hasta 20'": 1850,
        "Sobredimensionados Hasta 21'": 1950,
        "Moto en Piso (Hasta 7')": 475,
        "Moto en Piso (Más de 7')": 755,
        "Motocicletas Sobre PickUp": 450,
        "Carga Dentro de Vehículos": 200
    },
    "DELAWARE": {
        "Sedan Hasta 15'": 875,
        "Pequeños (15'1\" - 15'6\")": 975,
        "Medianos (15'7\" - 16'6\")": 1100,
        "Grandes (16'7\" - 16'11\")": 1295,
        "Grandes (17' - 17'6\")": 1445,
        "Extragrandes (17'7\" - 18'11\")": 1550,
        "Sobredimensionados (19' - 21'11\")": 1695,
        "Moto Sobre Piso (Hasta 7')": 650,
        "Moto Sobre Piso (Más de 7')": 925,
        "Motocicletas Sobre PickUp": 495,
        "Carga (Solo Repuestos)": 200
    }
};


const manualGruasPTP = {
    "ALABAMA": { "AL - Birmingham": 500, "AL - Dothan": 475, "AL - Mobile": 475, "AL - Montgomery": 470, "AL - Tanner": 500 }, //
    "GEORGIA": { "GA - Atlanta": 375, "GA - Loganville": 365, "GA - Savannah": 335, "GA - Tifton": 360, "GA - Augusta": 400, "GA - Macon": 365 }, //
    "ARKANSAS": { "AR - Fayetteville": 475, "AR - Little Rock": 400 }, //
    "COLORADO": { "CO - Colorado Springs": 670, "CO - Denver": 645, "CO - Brighton": 645 }, //
    "FLORIDA": { "FL - Miami": 90, "FL - Orlando": 220, "FL - Tampa": 230, "FL - Jacksonville": 250, "FL - West Palm Beach": 125, "FL - Tallahassee": 350 }, //
    "TEXAS": { "TX - Houston": 145, "TX - Dallas": 250, "TX - San Antonio": 245, "TX - Austin": 265, "TX - Amarillo": 420, "TX - El Paso": 400, "TX - McAllen": 0 }, // McAllen: A Cotizar
    "NEW_JERSEY": { "NJ - Avenel": 170, "NJ - Morganville": 170, "NJ - Glassboro": 135, "NJ - Somerville": 165, "NJ - Trenton": 225 }, //
    "NEW_YORK": { "NY - Albany": 320, "NY - Buffalo": 575, "NY - Long Island": 290, "NY - Newburgh": 255, "NY - Rochester": 410, "NY - Syracuse": 360 }, //
    "OHIO": { "OH - Cleveland": 650, "OH - Columbus": 725, "OH - Dayton": 675, "OH - Todas las ciudades": 650 }, //
    "MARYLAND": { "MD - Baltimore": 210, "MD - Elkton": 185, "MD - Washington DC": 210 }, //
    "PENNSYLVANIA": { "PA - Philadelphia": 175, "PA - Pittsburgh": 370, "PA - York": 175, "PA - Scranton": 205, "PA - Harrisburg": 190, "PA - Altoona": 345 }, //
    "VIRGINIA": { "VA - Fredericksburg": 315, "VA - Richmond": 290, "VA - Suffolk": 465, "VA - Tidewater": 365, "VA - Culpeper": 295 }, //
    "ILLINOIS": { "IL - Chicago": 610, "IL - Southern Illinois": 600, "IL - St. Louis": 650 }, //
    "OKLAHOMA": { "OK - Oklahoma City": 450, "OK - Tulsa": 450 }, //
    "CALIFORNIA": { "CA - Todas las ciudades": 0 }, // A Cotizar
    "ARIZONA": { "AZ - Phoenix": 800, "AZ - Tucson": 950 }, //
    "MISSISSIPPI": { "MS - Todas las ciudades": 0 }, // A Cotizar
    "IOWA": { "IA - Todas las ciudades": 0 }, // A Cotizar
    "MONTANA": { "MT - Todas las ciudades": 0 }, // A Cotizar
    "NEVADA": { "NV - Todas las ciudades": 0 }, // A Cotizar
    "UTAH": { "UT - Todas las ciudades": 0 }, // A Cotizar
    "WYOMING": { "WY - Todas las ciudades": 0 } // A Cotizar
};

function normalizeStateKey(state) {
    return state.trim().toUpperCase().replace(/\s+/g, '_');
}

function normalizePrice(price) {
    if (typeof price === 'number') return price;
    if (typeof price !== 'string') return null;
    if (/A cotizar/i.test(price)) return null;
    const numeric = price.replace(/[^0-9.]/g, '');
    return numeric === '' ? null : parseFloat(numeric);
}

function normalizeGruasPTP(rawData) {
    return Object.fromEntries(
        Object.entries(rawData).map(([state, cities]) => [
            normalizeStateKey(state),
            Object.fromEntries(
                Object.entries(cities).map(([city, price]) => [city, normalizePrice(price)])
            )
        ])
    );
}

function buscarFallbackGrua(cities) {
    const fallbackEntry = Object.entries(cities).find(([city]) => /todas|all|todos/i.test(city));
    return fallbackEntry ? fallbackEntry[1] : null;
}

const normalizedGruasExtraido = (typeof gruasExtraido !== 'undefined')
    ? normalizeGruasPTP(gruasExtraido)
    : {};

// Use extracted PDF crane rates as authoritative when available.
// When a state has extracted city-level rates, keep only manual fallback entries
// ("todas", "all", "todos") from the old manual city list to avoid stale prices.
const gruasPTP = Object.keys({ ...manualGruasPTP, ...normalizedGruasExtraido }).reduce((acc, state) => {
    const manualCities = manualGruasPTP[state] || {};
    const extractedCities = normalizedGruasExtraido[state] || {};
    const manualFallback = Object.fromEntries(
        Object.entries(manualCities).filter(([city]) => /todas|all|todos/i.test(city))
    );

    const cities = Object.keys(extractedCities).length > 0
        ? manualFallback
        : manualCities;

    acc[state] = {
        ...cities,
        ...extractedCities
    };
    return acc;
}, {});

// Mapeo por zonas (Imagen 13)
const puertoMappingPTP = {
    "TEXAS": "TEXAS", "LOUISIANA": "TEXAS", "ARKANSAS": "TEXAS", "MISSOURI": "TEXAS", "OKLAHOMA": "TEXAS", "KANSAS": "TEXAS", "COLORADO": "TEXAS", "NEW_MEXICO": "TEXAS", "WYOMING": "TEXAS", "MONTANA": "TEXAS", "IDAHO": "TEXAS", "UTAH": "TEXAS", "ARIZONA": "TEXAS", "NEVADA": "TEXAS", "CALIFORNIA": "TEXAS", "OREGON": "TEXAS", "WASHINGTON": "TEXAS", "NEBRASKA": "TEXAS", "NORTH_DAKOTA": "TEXAS", "SOUTH_DAKOTA": "TEXAS", "IOWA": "TEXAS",
    "FLORIDA": "FLORIDA", "ALABAMA": "FLORIDA", "GEORGIA": "FLORIDA", "TENNESSEE": "FLORIDA", "MISSISSIPPI": "FLORIDA", "NORTH_CAROLINA": "FLORIDA", "SOUTH_CAROLINA": "FLORIDA",
    "DELAWARE": "DELAWARE", "NEW_JERSEY": "DELAWARE", "NEW_YORK": "DELAWARE", "MARYLAND": "DELAWARE", "PENNSYLVANIA": "DELAWARE", "VIRGINIA": "DELAWARE", "WEST_VIRGINIA": "DELAWARE", "ILLINOIS": "DELAWARE", "NEW_HAMPSHIRE": "DELAWARE", "CONNECTICUT": "DELAWARE", "MAINE": "DELAWARE", "MASSACHUSETTS": "DELAWARE", "RHODE_ISLAND": "DELAWARE", "VERMONT": "DELAWARE", "MICHIGAN": "DELAWARE", "WISCONSIN": "DELAWARE", "MINNESOTA": "DELAWARE", "OHIO": "DELAWARE"
};

function actualizarCategoriasPTP() {
    const estadoSel = document.getElementById("estado").value;
    const selectorPTP = document.getElementById("tamanoPTP");
    
    // 1. Buscamos a qué puerto pertenece el estado seleccionado (usando tu mapping)
    const puertoBase = puertoMappingPTP[estadoSel];
    
    // 2. Limpiamos las opciones que tenga actualmente el select
    selectorPTP.innerHTML = '<option value="">-- Seleccione Categoría PTP --</option>';
    
    // 3. Si el estado existe en el mapping y tiene tarifas en la matriz
    if (puertoBase && fleteMatrizPTP[puertoBase]) {
        const categorias = Object.keys(fleteMatrizPTP[puertoBase]);
        
        // 4. Creamos una opción nueva por cada categoría de la imagen
        categorias.forEach(cat => {
            let opt = document.createElement("option");
            opt.value = cat;
            opt.textContent = cat;
            selectorPTP.appendChild(opt);
        });
    } else {
        // En caso de que el estado no esté mapeado
        let opt = document.createElement("option");
        opt.textContent = "Sin servicio PTP disponible";
        selectorPTP.appendChild(opt);
    }
}