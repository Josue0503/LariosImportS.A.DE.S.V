function Motocicleta(precioVenta) {
  let buyerFee = 0;

  // Buyer Fee (Rec Rides)
  if (precioVenta >= 0 && precioVenta <= 49.99) {
    buyerFee = 30;
  } else if (precioVenta >= 100 && precioVenta <= 199.99) {
    buyerFee = 70;
  } else if (precioVenta >= 500 && precioVenta <= 599.99) {
    buyerFee = 170;
  } else if (precioVenta >= 1000 && precioVenta <= 1199.99) {
    buyerFee = 290;
  } else if (precioVenta >= 3000 && precioVenta <= 3499.99) {
    buyerFee = 575;
  } else if (precioVenta >= 5000 && precioVenta <= 5999.99) {
    buyerFee = 700;
  } else if (precioVenta > 10000) {
    buyerFee = precioVenta * 0.105; // 10.5%
  } else {
    buyerFee = 0; // rangos no definidos
  }

  // Cargos fijos
  const serviceFee = 95;
  const environmentalFee = 15;
  const titleFee = 20;

  const total =
    buyerFee +
    serviceFee +
    environmentalFee +
    titleFee;

  return {
    precioVenta,
    buyerFee,
    serviceFee,
    environmentalFee,
    titleFee,
    total
  };
}