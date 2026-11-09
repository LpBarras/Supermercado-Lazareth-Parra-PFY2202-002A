import { Link } from "react-router";
import useInventario from "../hooks/useInventario.js";
import { formatoPrecio } from "../util/formato.js";

export default function ProductoCard({ producto }) {
  // función para agregar productos al carrito.
  const { agregarAlCarrito } = useInventario();

  return (
    <article className="panel flex h-full flex-col overflow-hidden">
      {/* Icono del producto */}
      <div
        className="flex h-36 items-center justify-center bg-gradient-to-br from-lime-50 to-green-100 text-7xl"
        aria-hidden="true"
      >
        {producto.icono}
      </div>

      {/* Información del producto */}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-bold uppercase tracking-wide text-green-700">
          {producto.categoria}
        </span>

        <h3 className="mt-1 text-lg font-bold">{producto.nombre}</h3>

        <p className="text-sm text-gray-500">
          {producto.marca} · {producto.unidad}
        </p>

        <p className="mt-3 text-xl font-extrabold text-green-800">
          {formatoPrecio(producto.precio)}
        </p>

        <p
          className={`mt-1 text-sm font-semibold ${
            producto.stock ? "text-green-700" : "text-red-600"
          }`}
        >
          Stock disponible: {producto.stock}
        </p>

        {/* Botones */}
        <div className="mt-auto flex flex-col gap-2 pt-4">
          <Link className="btn btn-secondary" to={`/inventario/${producto.id}`}>
            Ver detalle
          </Link>

          <button
            type="button"
            className="btn btn-primary"
            disabled={producto.stock === 0}
            //se puede agregar al carrito directamente sin ver el detalle
            onClick={() => agregarAlCarrito(producto.id)}
          >
            //si no queda stock del producto el boton cambia 
            {producto.stock > 0 ? "Agregar al carrito" : "Sin stock"}
          </button>
        </div>
      </div>
    </article>
  );
}
