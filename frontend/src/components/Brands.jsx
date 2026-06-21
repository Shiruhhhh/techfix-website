import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Flex, Tag, Skeleton } from "antd";

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_URL || "";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/catalog/brands`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setBrands)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div id="marcas" style={{ padding: "64px 24px", background: "#f5f7fa", textAlign: "center" }}>
      <Title level={2}>Reparamos Todas as Marcas</Title>
      <Flex justify="center" gap={16} wrap style={{ marginTop: 24 }} aria-busy={loading || failed} aria-live="polite">
        {loading || failed
          ? Array.from({ length: 8 }).map((_, i) => (
              <Skeleton.Button key={i} active size="large" shape="round" style={{ width: 100 }} />
            ))
          : brands.map((b) => (
              <Link key={b.id} to={`/reparar/${b.id}`}>
                <Tag color="blue" style={{ fontSize: 14, padding: "8px 18px", borderRadius: 8 }}>
                  {b.name}
                </Tag>
              </Link>
            ))}
      </Flex>
    </div>
  );
}
