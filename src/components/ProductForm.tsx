// src/components/ProductForm.tsx
import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap instalado

interface Props {
  selectedProduct: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
  
}

export default function ProductForm({ selectedProduct, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Product>({
    Articulo: '',
    Modelo: '',
    Color: '',
    FechaIngreso: '',
    CantidadActual: 0
  });

  const [showForm, setShowForm] = useState(false); // Controla la visibilidad del formulario

  useEffect(() => {
    if (selectedProduct) setForm(selectedProduct);
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'CantidadActual' ? +value : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setForm({
      Articulo: '',
      Modelo: '',
      Color: '',
      FechaIngreso: '',
      CantidadActual: 0
    });
    setShowForm(false); // Ocultar el formulario después de guardar
  };

  return (
    <div className="container mt-4">
      {/* Modal de agregar/editar producto */}
      <div className={`modal ${showForm ? "show" : ""}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden={!showForm} style={{ display: showForm ? "block" : "none" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedProduct ? 'Editar Producto' : 'Agregar Producto'}</h5>
              <button type="button" className="btn-close" onClick={() => { setShowForm(false); onCancel(); }}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="Articulo" className="form-label">Artículo</label>
                  <input
                    type="text"
                    id="Articulo"
                    name="Articulo"
                    className="form-control"
                    placeholder="Artículo"
                    value={form.Articulo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Modelo" className="form-label">Modelo</label>
                  <input
                    type="text"
                    id="Modelo"
                    name="Modelo"
                    className="form-control"
                    placeholder="Modelo"
                    value={form.Modelo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Color" className="form-label">Color</label>
                  <input
                    type="text"
                    id="Color"
                    name="Color"
                    className="form-control"
                    placeholder="Color"
                    value={form.Color}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="FechaIngreso" className="form-label">Fecha de Ingreso</label>
                  <input
                    type="date"
                    id="FechaIngreso"
                    name="FechaIngreso"
                    className="form-control"
                    value={form.FechaIngreso}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="CantidadActual" className="form-label">Cantidad Actual</label>
                  <input
                    type="number"
                    id="CantidadActual"
                    name="CantidadActual"
                    className="form-control"
                    value={form.CantidadActual}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); onCancel(); }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Botón para abrir el formulario */}
      {!showForm && (
        <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>
          Agregar Artículo
        </button>
      )}
    </div>
  );
}
