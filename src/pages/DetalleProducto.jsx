import { Link, useParams } from "react-router";
import useInventario from "../hooks/useInventario.js";
import { formatoPrecio } from "../util/formato.js";
export default function DetalleProducto() {
  const { id } = useParams();
  const { productos, carrito, agregarAlCarrito } = useInventario();
  const producto = productos.find((p) => p.id === id);
  if (!producto)
    return (
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <Link
          to="/inventario"
          className="mt-4 inline-block text-green-700 underline"
        >
          Volver al inventario
        </Link>
      </section>
    );
  const enCarrito = carrito.find((item) => item.id === id)?.cantidad ?? 0;
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <Link to="/inventario" className="font-semibold text-green-700 underline">
        ← Volver al inventario
      </Link>
      <div className="panel mt-6 grid overflow-hidden md:grid-cols-2">
        <div
          className="flex min-h-72 items-center justify-center bg-gradient-to-br from-lime-50 to-green-100 text-9xl"
          aria-label={`Imagen ilustrativa de ${producto.nombre}`}
        >
          {producto.icono}
        </div>
        <div className="p-7 md:p-10">
          <span className="text-sm font-bold uppercase text-green-700">
            {producto.categoria}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold">{producto.nombre}</h1>
          <p className="mt-2 text-gray-600">
            Marca: {producto.marca} · {producto.unidad}
          </p>
          <p className="mt-5 text-3xl font-extrabold text-green-800">
            {formatoPrecio(producto.precio)}
          </p>
          <p className="mt-5 text-gray-700">{producto.descripcion}</p>
          <div className="mt-6 rounded-xl bg-green-50 p-4">
            <p
              className={`font-bold ${producto.stock ? "text-green-800" : "text-red-700"}`}
              aria-live="polite"
            >
              Disponibles: {producto.stock} unidades
            </p>
            <p className="mt-1 text-sm text-gray-600">
              En el carrito: {enCarrito}
            </p>
          </div>
          <button
            type="button"
            disabled={producto.stock === 0}
            onClick={() => agregarAlCarrito(producto.id)}
            className="btn btn-primary mt-6 w-full"
          >
            {producto.stock ? "Agregar 1 unidad al carrito" : "Sin stock"}
          </button>
          <Link to="/carrito" className="btn btn-secondary mt-3 w-full">
            Ver carrito
          </Link>
        </div>
      </div>
    </section>
  );
}
