// Filtrar crea una nueva lista sin modificar el inventario original.
export function filtrarProductos(productos, categoria) {
  return categoria === "Todas"
    ? productos
    : productos.filter((producto) => producto.categoria === categoria);
}
