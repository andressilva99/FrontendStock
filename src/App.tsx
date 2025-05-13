// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import AdminPanel from "./Administrador";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/empleado" element={<h2>Panel de Empleado</h2>} />
    </Routes>
  );
}

export default App;
