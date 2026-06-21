import { Layout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BrandPicker from "./components/catalog/BrandPicker";
import FamilyPicker from "./components/catalog/FamilyPicker";
import ModelPicker from "./components/catalog/ModelPicker";
import ModelDetail from "./components/catalog/ModelDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Layout.Content>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reparar" element={<BrandPicker />} />
            <Route path="/reparar/:brandId" element={<FamilyPicker />} />
            <Route path="/reparar/:brandId/m/:modelId" element={<ModelDetail />} />
            <Route path="/reparar/:brandId/:familyId" element={<ModelPicker />} />
            <Route path="/reparar/:brandId/:familyId/:modelId" element={<ModelDetail />} />
          </Routes>
        </Layout.Content>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}
