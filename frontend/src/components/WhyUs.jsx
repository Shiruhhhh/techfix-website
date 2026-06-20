const REASONS = [
  {
    title: "Diagnóstico Gratuito",
    text: "Avaliamos o seu dispositivo sem compromisso antes de qualquer reparação.",
  },
  {
    title: "Peças de Qualidade",
    text: "Usamos componentes originais ou de qualidade equivalente, testados.",
  },
  {
    title: "Garantia em Todas as Reparações",
    text: "90 dias de garantia em peças e mão-de-obra em qualquer serviço.",
  },
  {
    title: "Reparação Rápida",
    text: "A maioria das reparações fica pronta no mesmo dia.",
  },
];

export default function WhyUs() {
  return (
    <section id="porque-nos" className="why-us">
      <div className="container">
        <h2>Porquê Escolher-nos</h2>
        <div className="why-us__grid">
          {REASONS.map((r) => (
            <div className="why-us__card" key={r.title}>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
