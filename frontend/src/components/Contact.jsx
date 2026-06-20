import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="contact">
      <div className="container contact__inner">
        <div className="contact__info">
          <h2>Contacte-nos</h2>
          <p>
            Envie-nos os detalhes do seu dispositivo e entramos em contacto
            para marcar a reparação.
          </p>
          <ul>
            <li>📍 Rua Exemplo, 123, Lisboa</li>
            <li>📞 +351 900 000 000</li>
            <li>✉️ geral@techfix.pt</li>
            <li>🕒 Seg-Sáb: 9h-19h</li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Descreva o problema do seu dispositivo"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
            {status === "sending" ? "A enviar..." : "Enviar Pedido"}
          </button>
          {status === "success" && <p className="contact__feedback contact__feedback--ok">Pedido enviado com sucesso!</p>}
          {status === "error" && <p className="contact__feedback contact__feedback--error">Erro ao enviar. Tente novamente.</p>}
        </form>
      </div>
    </section>
  );
}
