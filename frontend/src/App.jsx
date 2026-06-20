import { Layout } from "antd";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Brands from "./components/Brands";
import WhyUs from "./components/WhyUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Layout>
      <Header />
      <Layout.Content>
        <Hero />
        <Services />
        <Brands />
        <WhyUs />
        <Contact />
      </Layout.Content>
      <Footer />
    </Layout>
  );
}
