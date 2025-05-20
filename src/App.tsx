// src/App.tsx
import { Routes, Route } from "react-router-dom";
import AdminPanel from "./Administrador";
import RegistroUsuario from "./RegistroUsuario";
import Login from "./Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistroUsuario />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/empleado" element={<h2>Panel de Empleado</h2>} />
    </Routes>
  );
}

export default App;
