// src/services/userService.ts
import type { User } from "../types/User";

const API_URL = 'https://backendstock-le0i.onrender.com/usuarios';

// Obtener todos los usuarios
export const getAllUsers = async (): Promise<User[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

// Crear un nuevo usuario
export const addUser = async (data: {
  nombreUsuario: string;
  email: string;
  contraseña: string;
}) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

// Editar usuario por Id
export const updateUser = async (id: number, user: User) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
};

// Eliminar usuario por Id
export const deleteUser = async (id: number) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
