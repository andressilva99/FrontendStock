// src/services/productService.ts
import type { Product } from "../types/Product";


const API_URL = 'https://backendstock-le0i.onrender.com/productos';

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addProduct = async (product: Product) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
};

export const updateProduct = async (id: number, product: Product) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
};

export const deleteProduct = async (id: number) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
