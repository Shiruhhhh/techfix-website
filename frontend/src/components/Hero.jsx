export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <h1>
            Reparação de Smartphones, Laptops e Desktops
          </h1>
          <p>
            Diagnóstico rápido, peças de qualidade e garantia em todas as
            reparações. Devolvemos o seu dispositivo a funcionar como novo.
          </p>
          <div className="hero__actions">
            <a href="#contacto" className="btn btn--primary">
              Marcar Reparação
            </a>
            <a href="#servicos" className="btn btn--ghost">
              Ver Serviços
            </a>
          </div>
        </div>
        <div className="hero__stats">
          <div className="stat">
            <strong>15+</strong>
            <span>Anos de Experiência</span>
          </div>
          <div className="stat">
            <strong>30 min</strong>
            <span>Reparações Express</span>
          </div>
          <div className="stat">
            <strong>90 dias</strong>
            <span>Garantia</span>
          </div>
        </div>
      </div>
    </section>
  );
}
