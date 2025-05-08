// src/components/ProductForm.tsx
import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  selectedProduct: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
  showForm: boolean;
  setShowForm: (value: boolean) => void;
}

export default function ProductForm({
  selectedProduct,
  onSave,
  onCancel,
}: Props) {
  const [form, setForm] = useState<Product>({
    Articulo: '',
    Modelo: '',
    Color: '',
    FechaIngreso: '',
    CantidadActual: 0,
  });

  useEffect(() => {
    if (selectedProduct) {
      setForm(selectedProduct);
    } else {
      // Si es nuevo, limpiar formulario
      setForm({
        Articulo: '',
        Modelo: '',
        Color: '',
        FechaIngreso: '',
        CantidadActual: 0,
      });
    }
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'CantidadActual' ? +value : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {selectedProduct ? 'Editar Producto' : 'Agregar Producto'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="Articulo" className="form-label">Artículo</label>
                <input
                  type="text"
                  id="Articulo"
                  name="Articulo"
                  className="form-control"
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
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
