import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/services/brands`)
      .then((res) => res.json())
      .then(setBrands)
      .catch(() => setBrands([]));
  }, []);

  return (
    <section id="marcas" className="brands">
      <div className="container">
        <h2>Reparamos Todas as Marcas</h2>
        <div className="brands__list">
          {brands.map((b) => (
            <span key={b} className="brands__item">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
