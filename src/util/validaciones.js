import { categorias } from "../data/categorias.js";

// Validaciones y restricciones para el formulario de ingreso de artículos.
export function validarProducto(valores) {
  const errores = {};
  const nombre = String(valores.nombre ?? "").trim();
  const marca = String(valores.marca ?? "").trim();
  const descripcion = String(valores.descripcion ?? "").trim();
  const unidad = String(valores.unidad ?? "").trim();
  const precio = Number(valores.precio);
  const stock = Number(valores.stock);
  if (nombre.length < 2)
    errores.nombre = "Ingresa un nombre de al menos 2 caracteres.";
  if (marca.length < 2)
    errores.marca = "Ingresa una marca de al menos 2 caracteres.";
  if (!categorias.includes(valores.categoria))
    errores.categoria = "Selecciona una categoría válida.";
  if (!Number.isInteger(precio) || precio <= 0)
    errores.precio = "El precio debe ser mayor que cero.";
  if (!Number.isInteger(stock) || stock < 0)
    errores.stock = "El stock debe mayor a cero y un numero entero.";
  if (!unidad) errores.unidad = "Indica la unidad o presentación.";
  if (descripcion.length < 5)
    errores.descripcion = "La descripción debe tener al menos 5 caracteres.";
  return {
    esValido: Object.keys(errores).length === 0,
    errores,
    datos: {
      nombre,
      marca,
      categoria: valores.categoria,
      precio,
      stock,
      unidad,
      descripcion,
      //se asigna automaticamente este icono para cualquier producto, dejo pendiente una opcion para gregar un icono a eleccion
      icono: "🛒",
    },
  };
}
