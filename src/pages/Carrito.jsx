import { Link } from "react-router";
import useInventario from "../hooks/useInventario.js";
import { formatoPrecio } from "../util/formato.js";
export default function Carrito() {
  const { productos, carrito, agregarAlCarrito, disminuirDelCarrito } =
    useInventario();
  const lineas = carrito
    .map((item) => ({
      ...item,
      producto: productos.find((p) => p.id === item.id),
    }))
    .filter((item) => item.producto);
  const total = lineas.reduce(
    (suma, item) => suma + item.cantidad * item.producto.precio,
    0,
  );
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-sm font-bold uppercase text-green-700">
        Selección de artículos
      </p>
      <h1 className="mt-1 text-3xl font-extrabold">Carrito de compras</h1>
      {lineas.length === 0 ? (
        <div className="panel mt-7 p-10 text-center">
          <p className="text-5xl">🛒</p>
          <h2 className="mt-4 text-xl font-bold">Tu carrito está vacío</h2>
          <p className="mt-2 text-gray-500">
            Explora el inventario y selecciona un producto.
          </p>
          <Link className="btn btn-primary mt-5" to="/inventario">
            Ver inventario
          </Link>
        </div>
      ) : (
        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            {lineas.map(({ id, cantidad, producto }) => (
              <article
                className="panel flex flex-wrap items-center gap-4 p-5"
                key={id}
              >
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-50 text-4xl"
                  aria-hidden="true"
                >
                  {producto.icono}
                </span>
                <div className="min-w-36 flex-1">
                  <Link
                    className="font-bold text-green-800 underline"
                    to={`/inventario/${id}`}
                  >
                    {producto.nombre}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {producto.marca} · {formatoPrecio(producto.precio)} c/u
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Stock restante: {producto.stock}
                  </p>
                </div>
                <div
                  className="flex items-center gap-3"
                  aria-label={`Cantidad de ${producto.nombre}`}
                >
                  <button
                    type="button"
                    aria-label={`Disminuir ${producto.nombre}`}
                    className="btn btn-secondary"
                    onClick={() => disminuirDelCarrito(id)}
                  >
                    −
                  </button>
                  <span
                    className="min-w-6 text-center font-bold"
                    aria-live="polite"
                  >
                    {cantidad}
                  </span>
                  <button
                    type="button"
                    aria-label={`Aumentar ${producto.nombre}`}
                    className="btn btn-secondary"
                    disabled={producto.stock === 0}
                    onClick={() => agregarAlCarrito(id)}
                  >
                    +
                  </button>
                </div>
                <p className="min-w-24 text-right font-bold">
                  {formatoPrecio(cantidad * producto.precio)}
                </p>
              </article>
            ))}
          </div>
          <aside className="panel p-6">
            <h2 className="text-xl font-bold">Resumen</h2>
            <p className="mt-4 text-gray-600">
              Unidades: {lineas.reduce((s, item) => s + item.cantidad, 0)}
            </p>
            <div className="mt-4 flex justify-between border-t pt-4 text-lg font-extrabold">
              <span>Total</span>
              <span>{formatoPrecio(total)}</span>
            </div>
            <Link className="btn btn-primary mt-5 w-full" to="/inventario">
              Seguir explorando
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
