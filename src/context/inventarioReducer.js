export const ACCIONES = {
  AGREGAR_PRODUCTO: "AGREGAR_PRODUCTO",
  AGREGAR_CARRITO: "AGREGAR_CARRITO",
  DISMINUIR_CARRITO: "DISMINUIR_CARRITO",
};

export function crearEstadoInicial(productos) {
  return {
    productos: productos.map((producto) => ({ ...producto })),
    carrito: [],
  };
}

// El inventario y el carrito se actualizan al mismo tiempo
export function inventarioReducer(estado, accion) {
  switch (accion.type) {
    case ACCIONES.AGREGAR_PRODUCTO:
      return { ...estado, productos: [...estado.productos, accion.producto] };
    case ACCIONES.AGREGAR_CARRITO: {
      //si no hay stock o no existe el producto no hace nada
      const producto = estado.productos.find((p) => p.id === accion.id);
      if (!producto || producto.stock <= 0) return estado;
      const existe = estado.carrito.some((item) => item.id === accion.id);
      return {
        //si hay stock se disminuye en 1 y si ya estaba en el carrito se aumenta la cantidad, si no se agrega al carrito.
        productos: estado.productos.map((p) =>
          //no modifica el producto original, crea una copia con el stock actualizado
          p.id === accion.id ? { ...p, stock: p.stock - 1 } : p,
        ),
        carrito: existe
          ? estado.carrito.map((item) =>
              item.id === accion.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item,
            )
          : [...estado.carrito, { id: accion.id, cantidad: 1 }],
      };
    }
    case ACCIONES.DISMINUIR_CARRITO: {
      const item = estado.carrito.find((entrada) => entrada.id === accion.id);
      if (!item) return estado;
      return {
        productos: estado.productos.map((p) =>
          p.id === accion.id ? { ...p, stock: p.stock + 1 } : p,
        ),
        carrito:
          item.cantidad === 1
            ? estado.carrito.filter((entrada) => entrada.id !== accion.id)
            : estado.carrito.map((entrada) =>
                entrada.id === accion.id
                  ? { ...entrada, cantidad: entrada.cantidad - 1 }
                  : entrada,
              ),
      };
    }
    default:
      return estado;
  }
}
