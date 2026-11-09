import { useState } from "react";
export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  function enviar(e) {
    e.preventDefault();
    setEnviado(true);
    e.currentTarget.reset();
  }
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-bold uppercase text-green-700">Información</p>
      <h1 className="mt-2 text-4xl font-extrabold">Contáctanos</h1>

      <form className="panel mt-7 space-y-5 p-7" onSubmit={enviar}>
        <div>
          <label htmlFor="nombre" className="mb-2 block font-semibold">
            Nombre
          </label>
          <input className="field" id="nombre" required minLength="2" />
        </div>
        <div>
          <label htmlFor="correo" className="mb-2 block font-semibold">
            Correo electrónico
          </label>
          <input className="field" id="correo" type="email" required />
        </div>
        <div>
          <label htmlFor="mensaje" className="mb-2 block font-semibold">
            Mensaje
          </label>
          <textarea
            className="field"
            id="mensaje"
            rows="4"
            required
            minLength="5"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Enviar mensaje
        </button>
        {enviado && (
          <p
            role="status"
            className="rounded-lg bg-green-100 p-3 text-green-900"
          >
            Mensaje valido, gracias por contactarnos. Te responderemos a la
            brevedad.
          </p>
        )}
      </form>
    </section>
  );
}
