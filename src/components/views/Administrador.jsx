import { Table, Button } from "react-bootstrap";
import ItemProducto from "./producto/ItemProducto";
import { useEffect, useState } from "react";
import { obtenerListaProductos } from "../helpers/queries";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Administrador = () => {
  const [productos, SetProductos] = useState([]);

  useEffect(() => {
    //consultar a la api y guardar la respuesta en el state
    obtenerListaProductos().then((respuesta) => {
      if (respuesta) {
        SetProductos(respuesta);
      } else {
        Swal.fire(
          "Error",
          "Intente realizar esta operación en unos minutos",
          "error"
        );
      }
    });
  }, []);

  return (
    <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 ">Productos disponibles</h1>
        <Link className="btn btn-primary" to="/administrador/crear-producto">
          Agregar Producto
        </Link>
        <Link className="btn btn-outline-warning" to="/administrador/venta">
          <i class="bi bi-cart-plus"></i> Nueva Venta
        </Link>
      </div>
      <hr />
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Cantidad</th>
            <th>Marca</th>
            <th>Descripción Producto</th>
            <th>Costo</th>
            <th>Precio</th>
            <th>URL de Imagen</th>
            <th>Categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <ItemProducto
              key={producto.id}
              productos={productos}
              producto={producto}
              setProductos={SetProductos}
            ></ItemProducto>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default Administrador;
