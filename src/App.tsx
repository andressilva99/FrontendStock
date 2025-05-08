import { useEffect, useState } from "react";
import type { Product } from "./types/Product";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "./services/productService";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false); // Estado para controlar visibilidad del formulario

  const fetchData = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (product: Product) => {
    if (product.IdProducto) {
      await updateProduct(product.IdProducto, product);
    } else {
      await addProduct(product);
    }
    setSelectedProduct(null);
    setShowForm(false); // Ocultar formulario luego de guardar
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    fetchData();
  };

  return (
    <div className="container mt-4">
      {/* Mostrar formulario si está activo */}
      {showForm && (
        <ProductForm
          selectedProduct={selectedProduct}
          onSave={handleSave}
          onCancel={() => {
            setSelectedProduct(null);
            setShowForm(false);
          }}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}

      {/* Mostrar título, tabla y botón solo si el formulario está oculto */}
      {!showForm && (
        <>
          <h1>Gestión de Productos</h1>
          <ProductTable
            products={products}
            onEdit={(p) => {
              setSelectedProduct(p);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-primary"
              onClick={() => {
                setSelectedProduct(null); // limpiar el formulario
                setShowForm(true);
              }}
            >
              Agregar Artículo
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
