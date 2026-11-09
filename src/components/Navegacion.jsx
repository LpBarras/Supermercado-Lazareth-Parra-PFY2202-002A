import { NavLink } from "react-router";
import useInventario from "../hooks/useInventario.js";

// Enlaces del menú principal. carrito se dejo en el boton superior de la pagina
const enlaces = [
  ["/", "Inicio"],
  ["/inventario", "Inventario"],
  ["/nuevo", "Ingresar artículo"],
  ["/quienes-somos", "Quiénes somos"],
  ["/contacto", "Contacto"],
];

export default function Navegacion() {
  // Obtener los productos agregados al carrito.
  const { carrito } = useInventario();

  // Calcular la cantidad total de unidades del carrito co reduce para recorrerlos todos.
  const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <header className="bg-green-900 text-white shadow-md">
      <div className="mx-auto max-w-6xl px-4 py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Nombre del supermercado */}
          <NavLink to="/" className="text-2xl font-extrabold tracking-tight">
            Mercado Verde
            <span className="block text-xs font-normal text-green-200">
              Gestión de inventario
            </span>
          </NavLink>

          {/* Enlace al carrito con contador de unidades */}
          <NavLink
            to="/carrito"
            aria-label={`Ver carrito, ${cantidad} unidades`}
            title="Ver carrito"
            className={({ isActive }) =>
              `rounded-full px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-white text-green-900"
                  : "bg-green-800 text-white hover:bg-green-700"
              }`
            }
          >
            🛒 {cantidad} {cantidad === 1 ? "unidad" : "unidades"}
          </NavLink>
        </div>

        {/* Menu de navegación principal */}
        <nav
          aria-label="Navegación principal"
          className="mt-5 flex flex-wrap gap-2"
        >
          {enlaces.map(([ruta, texto]) => (
            <NavLink
              key={ruta}
              to={ruta}
              end={ruta === "/"}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-green-900"
                    : "text-green-50 hover:bg-green-800"
                }`
              }
            >
              {texto}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
