import { useState } from "react";
import { Link } from "react-router";
import useInventario from "../hooks/useInventario.js";
import { categorias } from "../data/categorias.js";
const inicial = {
  nombre: "",
  marca: "",
  categoria: "",
  precio: "",
  stock: "",
  unidad: "",
  descripcion: "",
};
const campos = [
  ["nombre", "Nombre del producto"],
  ["marca", "Marca"],
  ["unidad", "Presentación (ej. 1 kg)"],
  ["precio", "Precio en pesos"],
  ["stock", "Cantidad inicial"],
];
export default function NuevoProducto() {
  const { agregarProducto } = useInventario();
  const [valores, setValores] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  function cambiar(evento) {
    setValores({ ...valores, [evento.target.name]: evento.target.value });
    setMensaje("");
  }
  function enviar(evento) {
    evento.preventDefault();
    const resultado = agregarProducto(valores);
    setErrores(resultado.errores);
    if (resultado.esValido) {
      setValores(inicial);
      setMensaje("Producto ingresado correctamente al inventario.");
    }
  }
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-bold uppercase text-green-700">
        Administración
      </p>
      <h1 className="mt-1 text-3xl font-extrabold">Ingresar nuevo artículo</h1>
      <p className="mt-2 text-gray-600">
        Completa los datos para agregar un producto.
      </p>
      <form
        onSubmit={enviar}
        noValidate
        className="panel mt-7 space-y-5 p-6 md:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {campos.map(([nombre, etiqueta]) => (
            <div key={nombre}>
              <label htmlFor={nombre} className="mb-2 block text-sm font-bold">
                {etiqueta}
              </label>
              <input
                className="field"
                id={nombre}
                name={nombre}
                type={
                  nombre === "precio" || nombre === "stock" ? "number" : "text"
                }
                min={
                  nombre === "precio"
                    ? "1"
                    : nombre === "stock"
                      ? "0"
                      : undefined
                }
                step={
                  nombre === "precio" || nombre === "stock" ? "1" : undefined
                }
                value={valores[nombre]}
                onChange={cambiar}
                aria-invalid={Boolean(errores[nombre])}
              />
              {errores[nombre] && (
                <p className="mt-1 text-sm text-red-700">{errores[nombre]}</p>
              )}
            </div>
          ))}
          <div>
            <label htmlFor="categoria" className="mb-2 block text-sm font-bold">
              Categoría
            </label>
            <select
              id="categoria"
              name="categoria"
              className="field"
              value={valores.categoria}
              onChange={cambiar}
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            {errores.categoria && (
              <p className="mt-1 text-sm text-red-700">{errores.categoria}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="descripcion" className="mb-2 block text-sm font-bold">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="3"
            className="field"
            value={valores.descripcion}
            onChange={cambiar}
          />
          {errores.descripcion && (
            <p className="mt-1 text-sm text-red-700">{errores.descripcion}</p>
          )}
        </div>
        {mensaje && (
          <p
            role="status"
            className="rounded-lg bg-green-100 p-3 font-semibold text-green-900"
          >
            {mensaje}{" "}
            <Link className="underline" to="/inventario">
              Ver inventario
            </Link>
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-primary" type="submit">
            Guardar artículo
          </button>
          <Link className="btn btn-secondary" to="/inventario">
            Volver al listado
          </Link>
        </div>
      </form>
    </section>
  );
}
