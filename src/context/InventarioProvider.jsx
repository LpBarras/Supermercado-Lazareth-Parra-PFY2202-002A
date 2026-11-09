import { useReducer } from "react";
import InventarioContext from "./InventarioContext.js";
import productosIniciales from "../data/productos.json";
import { validarProducto } from "../util/validaciones.js";
import {
  ACCIONES,
  crearEstadoInicial,
  inventarioReducer,
} from "./inventarioReducer.js";

//estado global y funciones. los componentes hijos pueden acceder para obtener el estado y las funciones para modificarlo.
export default function InventarioProvider({ children }) {
  //estodo contiene los productos y carritos, dispatch envia las instrucciones para modificarlo
  const [estado, dispatch] = useReducer(
    //decide como se actualizan los datos, recibe el estado actual y la accion a realizar
    inventarioReducer,
    //lista de prueba
    productosIniciales,
    //funcion que crea el estado inicial a partir de los productos iniciales
    crearEstadoInicial,
  );

  //no modifica directamente el inventario
  function agregarProducto(valores) {
    const resultado = validarProducto(valores);
    if (!resultado.esValido) return resultado;
    const producto = { id: crypto.randomUUID(), ...resultado.datos };
    //envia la accion al reducer para que modifique el estado
    dispatch({ type: ACCIONES.AGREGAR_PRODUCTO, producto });
    return { esValido: true, errores: {} };
  }

  function agregarAlCarrito(id) {
    dispatch({ type: ACCIONES.AGREGAR_CARRITO, id });
  }
  function disminuirDelCarrito(id) {
    dispatch({ type: ACCIONES.DISMINUIR_CARRITO, id });
  }

  return (
    <InventarioContext.Provider
      value={{
        ...estado,
        agregarProducto,
        agregarAlCarrito,
        disminuirDelCarrito,
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
}
