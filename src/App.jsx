import { Route, Routes } from "react-router";
import InventarioProvider from "./context/InventarioProvider.jsx";
import Navegacion from "./components/Navegacion.jsx";
import PiePagina from "./components/PiePagina.jsx";
import Inicio from "./pages/Inicio.jsx";
import Inventario from "./pages/Inventario.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import NuevoProducto from "./pages/NuevoProducto.jsx";
import Carrito from "./pages/Carrito.jsx";
import QuienesSomos from "./pages/QuienesSomos.jsx";
import Contacto from "./pages/Contacto.jsx";
//conecta todas las paginas
export default function App() {
  return (
    //todas las pantallas utilizan el mismo inventarioglobal
    <InventarioProvider>
      <div className="flex min-h-screen flex-col">
        <Navegacion />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inventario" element={<Inventario />} />
            //ruta dinamica para ver el detalle de un producto, se reutiliza un solo componente para mostrarlos todos
            <Route path="/inventario/:id" element={<DetalleProducto />} />
            <Route path="/nuevo" element={<NuevoProducto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route
              path="*"
              element={
                <section className="mx-auto max-w-5xl px-4 py-16">
                  <h1 className="text-3xl font-bold">Página no encontrada</h1>
                  <p className="mt-3">La dirección solicitada no existe.</p>
                </section>
              }
            />
          </Routes>
        </main>
        <PiePagina />
      </div>
    </InventarioProvider>
  );
}
