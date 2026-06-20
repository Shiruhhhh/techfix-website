export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="header__logo">
          Tech<span>Fix</span>
        </a>
        <nav className="header__nav">
          <a href="#servicos">Serviços</a>
          <a href="#marcas">Marcas</a>
          <a href="#porque-nos">Porquê Nós</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a href="#contacto" className="btn btn--primary header__cta">
          Marcar Reparação
        </a>
      </div>
    </header>
  );
}
