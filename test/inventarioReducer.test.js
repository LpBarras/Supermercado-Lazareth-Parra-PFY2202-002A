import test from "node:test";
import assert from "node:assert/strict";
import {
  ACCIONES,
  crearEstadoInicial,
  inventarioReducer,
} from "../src/context/inventarioReducer.js";
import { filtrarProductos } from "../src/util/filtro.js";
import { validarProducto } from "../src/util/validaciones.js";
const producto = {
  id: "a",
  nombre: "Leche",
  marca: "Marca",
  categoria: "Lácteos",
  precio: 1000,
  stock: 2,
  unidad: "1 L",
  descripcion: "Leche entera",
};
test("agregar al carrito descuenta una unidad", () => {
  const estado = inventarioReducer(crearEstadoInicial([producto]), {
    type: ACCIONES.AGREGAR_CARRITO,
    id: "a",
  });
  assert.equal(estado.productos[0].stock, 1);
  assert.equal(estado.carrito[0].cantidad, 1);
});
test("no permite stock negativo", () => {
  let estado = crearEstadoInicial([producto]);
  for (let i = 0; i < 4; i++)
    estado = inventarioReducer(estado, {
      type: ACCIONES.AGREGAR_CARRITO,
      id: "a",
    });
  assert.equal(estado.productos[0].stock, 0);
  assert.equal(estado.carrito[0].cantidad, 2);
});
test("disminuir carrito devuelve stock", () => {
  let estado = inventarioReducer(crearEstadoInicial([producto]), {
    type: ACCIONES.AGREGAR_CARRITO,
    id: "a",
  });
  estado = inventarioReducer(estado, {
    type: ACCIONES.DISMINUIR_CARRITO,
    id: "a",
  });
  assert.equal(estado.productos[0].stock, 2);
  assert.equal(estado.carrito.length, 0);
});
test("filtro conserva el arreglo original", () => {
  const productos = [producto, { ...producto, id: "b", categoria: "Bebidas" }];
  const filtrados = filtrarProductos(productos, "Lácteos");
  assert.equal(filtrados.length, 1);
  assert.equal(productos.length, 2);
  assert.equal(filtrarProductos(productos, "Todas").length, 2);
});
test("validación rechaza cantidades negativas", () => {
  assert.equal(validarProducto({ ...producto, stock: -1 }).esValido, false);
});
