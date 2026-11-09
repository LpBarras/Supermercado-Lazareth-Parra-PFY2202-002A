import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import App from "./App.jsx";
import "./index.css";

// Hash router permite abrir y recargar rutas en git Pages sin errores 404
createRoot(document.getElementById("root")).render(
    //detectar problemas
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
