# Supermercado-Lazareth-Parra-PFY2202-002A
# Gestión de inventario- sumativa 1

Supermercado ficticio desarrollado con React, JavaScript, HTML, React Router y Tailwind CSS de Lazareth Parra, desarrollo Frontend II.

## Funcionalidades

- Inicio con resumen de inventario y productos destacados.
- Páginas informativas: Quiénes somos y Contáctanos (solo de demostracion).
- Formulario validado para ingresar artículos.
- Tabla de inventario con nombre, marca, categoría, presentación, precio y stock.
- Filtro por categoría que no modifica la lista original.
- Detalle de cada producto mediante ruta dinámica.
- Carrito con botones + y − que descuentan o devuelven unidades al inventario.
- Interfaz responsive con Tailwind CSS.

## Estructura

- `src/pages`: pantallas del sitio.
- `src/components`: navegación, pie y tarjeta reutilizable.
- `src/context`: Context y reducer para estado global.
- `src/hooks`: hook para consultar el estado.
- `src/data`: productos iniciales y categorías
- `src/util`: filtro, validación y formato de precios.
- `test`: pruebas automáticas

## Limitaciones

Los datos iniciales son de prueba y el estado esta en memoria. Al recargar la agina se vuelve al inicio, si se agregaron productos al inventario, desaparecen. Se deja para una siguiente entrega agregar permanencia.
