import { useContext } from "react";
import InventarioContext from "../context/InventarioContext.js";
export default function useInventario() {
  const contexto = useContext(InventarioContext);
  if (!contexto)
    throw new Error("useInventario debe usarse dentro de InventarioProvider");
  return contexto;
}
