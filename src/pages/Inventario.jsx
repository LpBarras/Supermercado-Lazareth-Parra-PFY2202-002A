import { useState } from "react";
import useInventario from "../hooks/useInventario.js";
import { categorias } from "../data/categorias.js";
import { filtrarProductos } from "../util/filtro.js";
import { formatoPrecio } from "../util/formato.js";
import { Link } from "react-router";
export default function Inventario() {
  const { productos, agregarAlCarrito } = useInventario();
  const [categoria, setCategoria] = useState("Todas");
  // La lista filtradaes local y se calcula sin modificar el estado global.
  const visibles = filtrarProductos(productos, categoria);
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-green-700">
            Control de stock
          </p>
          <h1 className="mt-1 text-3xl font-extrabold">
            Inventario
          </h1>
               </div>
        <Link to="/nuevo" className="btn btn-primary">
          + Nuevo artículo
        </Link>
      </div>
      <div className="panel mt-7 flex flex-wrap items-end justify-between gap-4 p-5">
        <div className="w-full max-w-xs">
          <label htmlFor="filtro" className="mb-2 block text-sm font-semibold">
            Filtrar por categoría
          </label>
          <select
            id="filtro"
            className="field"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="Todas">Todas las categorías</option>
            {categorias.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-600" aria-live="polite">
          Mostrando <strong>{visibles.length}</strong> de {productos.length}{" "}
          artículos
        </p>
      </div>
      <div className="panel mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-green-50 text-green-950">
              <tr>
                {[
                  "Producto",
                  "Marca",
                  "Categoría",
                  "Presentación",
                  "Precio",
                  "Stock",
                  //puede ser ver detalle o agregar al carro
                  "Acciones",
                ].map((titulo) => (
                  <th scope="col" key={titulo} className="px-4 py-4 font-bold">
                    {titulo}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibles.map((p) => (
                <tr key={p.id} className="hover:bg-green-50/60">
                  <td className="px-4 py-4 font-semibold">
                    <span className="mr-2 text-xl" aria-hidden="true">
                      {p.icono}
                    </span>
                    {p.nombre}
                  </td>
                  <td className="px-4 py-4">{p.marca}</td>
                  <td className="px-4 py-4">{p.categoria}</td>
                  <td className="px-4 py-4">{p.unidad}</td>
                  <td className="px-4 py-4">{formatoPrecio(p.precio)}</td>
                  <td className="px-4 py-4">
                    <span
                      className={
                        p.stock
                          ? "font-bold text-green-700"
                          : "font-bold text-red-600"
                      }
                    >
                      {p.stock}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-2">
                      {/* Consultar la información del producto */}
                      <Link
                        to={`/inventario/${p.id}`}
                        className="font-bold text-green-700 underline"
                      >
                        Ver detalle
                      </Link>

                      {/* Agregar directamente al carrito */}
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled={p.stock === 0}
                        onClick={() => agregarAlCarrito(p.id)}
                      >
                        {p.stock > 0 ? "Agregar al carrito" : "Sin stock"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {visibles.length === 0 && (
          <p className="p-8 text-center text-gray-500">
            No hay artículos en esta categoría.
          </p>
        )}
      </div>
    </section>
  );
}
