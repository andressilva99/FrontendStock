// src/App.tsx
import { useEffect, useState } from "react";
import type { Product } from "./types/Product";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "./services/productService";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    setSelectedProduct(null); // Limpiar el producto seleccionado después de guardar
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    fetchData();
  };

 

  return (
    <div>
      <h1>Gestión de Productos</h1>

    
      {/* Formulario solo cuando haya un producto seleccionado (editar o agregar) */}
      {(selectedProduct || !selectedProduct) && (
        <ProductForm
          selectedProduct={selectedProduct}
          onSave={handleSave}
          onCancel={() => setSelectedProduct(null)}
        />
      )}

      {/* Tabla siempre visible */}
      <ProductTable
        products={products}
        onEdit={(p) => setSelectedProduct(p)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
