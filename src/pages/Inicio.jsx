import { Link } from "react-router";
import useInventario from "../hooks/useInventario.js";
import ProductoCard from "../components/ProductoCard.jsx";
export default function Inicio() {
  const { productos, carrito } = useInventario();
  const unidades = productos.reduce((total, p) => total + p.stock, 0);
  return (
    <div>
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lime-200">
            Supermercado · Panel de inventario
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight md:text-5xl">
            Todo tu inventario, organizado en un solo lugar.
          </h1>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              className="btn bg-lime-300 text-green-950 hover:bg-lime-200"
              to="/inventario"
            >
              Explorar inventario
            </Link>
            <Link
              className="btn border border-white text-white hover:bg-green-800"
              to="/nuevo"
            >
              Ingresar artículo
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="panel p-5">
            <p className="text-sm text-gray-500">Productos registrados</p>
            <p className="mt-2 text-3xl font-extrabold text-green-800">
              {productos.length}
            </p>
          </div>
          <div className="panel p-5">
            <p className="text-sm text-gray-500">Unidades disponibles</p>
            <p className="mt-2 text-3xl font-extrabold text-green-800">
              {unidades}
            </p>
          </div>
          <div className="panel p-5">
            <p className="text-sm text-gray-500">Unidades en carrito</p>
            <p className="mt-2 text-3xl font-extrabold text-green-800">
              {carrito.reduce((t, i) => t + i.cantidad, 0)}
            </p>
          </div>
        </div>
        <div className="mt-11 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-extrabold">Productos destacados</h2>
          <Link
            className="font-semibold text-green-700 underline"
            to="/inventario"
          >
            Ver todos
          </Link>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productos.slice(0, 3).map((p) => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
