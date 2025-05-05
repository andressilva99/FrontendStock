import type { Product } from "../types/Product";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Artículo</th>
          <th>Modelo</th>
          <th>Color</th>
          <th>Fecha</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.IdProducto}>
            <td>{p.IdProducto}</td>
            <td>{p.Articulo}</td>
            <td>{p.Modelo}</td>
            <td>{p.Color}</td>
            <td>{p.FechaIngreso}</td>
            <td>{p.CantidadActual}</td>
            <td>
              <button onClick={() => onEdit(p)}>Editar</button>
              <button onClick={() => onDelete(p.IdProducto!)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
