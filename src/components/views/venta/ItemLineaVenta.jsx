import { Button } from "react-bootstrap";

const ItemLineaVenta = ({ codigo, descripcion, precio, cantidad, eliminarLineaVenta }) => {
  
  const handleEliminarLineaVenta = (codigo) => {
    eliminarLineaVenta(codigo);
  }

  return (
    <tr>
      <td>{codigo}</td>
      <td>{descripcion}</td>
      <td>{cantidad}</td>
      <td>{precio * cantidad}</td>
      <th>
        <Button
          variant="danger"
          onClick={() => {
            handleEliminarLineaVenta(codigo);
          }}
        >
          <i class="bi bi-trash-fill"></i>
        </Button>
      </th>
    </tr>
  );
};

export default ItemLineaVenta;