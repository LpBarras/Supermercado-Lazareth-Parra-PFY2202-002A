export const formatoPrecio = (valor) =>
  //peso sin decimales y con separador de miles
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(valor);
