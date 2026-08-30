import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import Home from "./pages/Home";
import ModulePage from "./pages/ModulePage";
import Scenarios from "./pages/Scenarios";
import Study from "./pages/Study";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/study" element={<Study />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
