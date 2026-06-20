import { useEffect, useState } from "react";

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "phone", label: "Smartphone" },
  { id: "laptop", label: "Laptop" },
  { id: "desktop", label: "Desktop" },
];

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Services() {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const query = category === "all" ? "" : `?category=${category}`;
    fetch(`${API_URL}/api/services${query}`)
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar serviços");
        return res.json();
      })
      .then(setServices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <section id="servicos" className="services">
      <div className="container">
        <h2>Os Nossos Serviços</h2>
        <p className="section__subtitle">
          Reparamos smartphones, laptops e computadores de mesa de todas as marcas.
        </p>

        <div className="services__filters">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`filter-btn ${category === c.id ? "filter-btn--active" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {loading && <p className="services__status">A carregar serviços...</p>}
        {error && <p className="services__status services__status--error">{error}</p>}

        <div className="services__grid">
          {services.map((s) => (
            <div className="service-card" key={s.id}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <div className="service-card__meta">
                <span>A partir de {s.priceFrom}€</span>
                <span>{s.eta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
