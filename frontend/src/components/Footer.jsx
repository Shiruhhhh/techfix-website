export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© {new Date().getFullYear()} TechFix. Todos os direitos reservados.</span>
        <div className="footer__links">
          <a href="#servicos">Serviços</a>
          <a href="#marcas">Marcas</a>
          <a href="#contacto">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
