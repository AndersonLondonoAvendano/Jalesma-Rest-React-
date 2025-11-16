import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MaterialesList from "./components/materiales/MaterialesList";
import CrearMaterial from "./components/materiales/CrearMaterial";
import DetalleMaterial from "./components/materiales/DetalleMaterial";
import EditarMaterial from "./components/materiales/EditarMaterial";
import Navbar from "./components/Navbar";
import MarcaList from "./components/marcas/MarcaList";
import CrearMarca from "./components/marcas/CrearMarca";
import EditarMarca from "./components/marcas/EditarMarca";
import DetalleMarca from "./components/marcas/DetalleMarca";
import BolsoList from "./components/bolsos/BolsoList";
import CrearBolso from "./components/bolsos/CrearBolso";
import DetalleBolso from "./components/bolsos/DetalleBolso";
import EditarBolso from "./components/bolsos/EditarBolso";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Materiales */}
        <Route path="/materiales" element={<MaterialesList />} />
        <Route path="/materiales/crear" element={<CrearMaterial />} />
        <Route path="/materiales/:id" element={<DetalleMaterial />} />
        <Route path="/materiales/editar/:id" element={<EditarMaterial />} />


        {/* Bolsos */}
        <Route path="/bolsos" element={<BolsoList />} />
        <Route path="/bolsos/crear" element={<CrearBolso />} />
        <Route path="/bolsos/:id" element={<DetalleBolso />} />
        <Route path="/bolsos/editar/:id" element={<EditarBolso />} />


        {/* Marcas */}
        <Route path="/marcas" element={<MarcaList />} />
        <Route path="/marcas/crear" element={<CrearMarca />} />
        <Route path="/marcas/editar/:id" element={<EditarMarca />} />
        <Route path="/marcas/:id" element={<DetalleMarca />} />





        {/* Ruta por defecto */}
        <Route path="/" element={<MaterialesList />} />
      </Routes>
    </Router>
  );
}

export default App;
