import { Layout, Flex } from "antd";

export default function Footer() {
  return (
    <Layout.Footer style={{ paddingInline: 24 }}>
      <Flex justify="space-between" align="center" wrap gap={12} style={{ maxWidth: 1180, margin: "0 auto", color: "#cdd9e6" }}>
        <span>© {new Date().getFullYear()} TechFix. Todos os direitos reservados.</span>
        <Flex gap={20}>
          <a href="#servicos" style={{ color: "#cdd9e6" }}>Serviços</a>
          <a href="#marcas" style={{ color: "#cdd9e6" }}>Marcas</a>
          <a href="#contacto" style={{ color: "#cdd9e6" }}>Contacto</a>
        </Flex>
      </Flex>
    </Layout.Footer>
  );
}
