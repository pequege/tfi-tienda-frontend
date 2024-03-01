import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import LineasDeVenta from "./LineasVenta";
import Swal from "sweetalert2";

const BuscarProducto = ({ productos, total, setTotal }) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [search, setSearch] = useState("");
  const [lineasVenta, setLineasVenta] = useState([]);

  useEffect(() => {
    const storedLineasVenta = JSON.parse(localStorage.getItem("lineasVenta"));
    if (storedLineasVenta) {
      setLineasVenta(storedLineasVenta);
    };
    localStorage.setItem("lineasVenta", JSON.stringify(lineasVenta));
  }, []);

  const agregarLineaVenta = (producto) => {
    //busca codigo de producto repetido
    const productoRepetido = lineasVenta.find(
      (lineaVenta) => lineaVenta.codigoProducto === producto.codigo
    );
    //si returna Undefined, no está repetido crea una nueva linea
    if (!productoRepetido) {
      //crea nueva linea de venta con id asignado por la longitud del arreglo, codigo de producto es el del producto buscado
      //la cantidad inicial es 1 y el precio es el mismo del producto buscado
      const nuevaLineaVenta = {
        codigoProducto: producto.codigo,
        cantidad: 1,
        precio: producto.precio,
        descripcion: producto.descripcion,
      };
      //agrega la nueva linea a LineasVenta
      setLineasVenta((prevLineasVenta) => [
        ...prevLineasVenta,
        nuevaLineaVenta,
      ]);
    } else {
      const nuevasLineasVenta = lineasVenta.map((lineaVenta) => {
        if (lineaVenta.codigoProducto == producto.codigo) {
          // Si la línea de venta coincide con el producto repetido, aumenta la cantidad en 1
          if (lineaVenta.cantidad >= producto.cantidad) {
            // Si la cantidad de la línea de venta es mayor o igual a la cantidad de producto, se muestra un mensaje y se devuelve la línea de venta sin modificar
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "warning",
              title: "Cantidad máxima de producto"
            });
            return lineaVenta;
          } else{
            return { ...lineaVenta, cantidad: lineaVenta.cantidad + 1};
          }
        } else {
          return lineaVenta;
        }
      });
      setLineasVenta(nuevasLineasVenta);
    }
  };

  const eliminarLineaVenta = (codigoAEliminar) => {
    // Crea una nueva arrau excluyendo la línea de venta con el codigoAEliminar proporcionado
    const nuevaLineasVenta = lineasVenta.filter(
      (linea) => linea.codigoProducto !== codigoAEliminar
      );
      // Actualiza el estado lineasVenta con el nuevo arrau
      setLineasVenta(nuevaLineasVenta);
  };

  return (
    <>
      <Row>
        <Col xs={6}>
          <Form>
            <Form.Group className="mb-3" controlId="asd">
              <Form.Label>Código *</Form.Label>
              <Form.Control
                onKeyUp={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
                placeholder="Ej: 12345"
                {...register("codigo", {
                  required: "El Código del producto es obligatorio",
                  minLength: {
                    value: 1,
                    message: "La longitud mínima del Código es de 1 caracteres",
                  },
                  maxLength: {
                    value: 1000,
                    message: "La longitud máxima del código es de 4 caracteres",
                  },
                  max: {
                    value: 9999,
                    message: "El Código máximo es de 9999",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.codigo?.message}
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>
        <Col xs={6} className="d-flex flex-column justify-content-end mb-3">
          <h5>Detalle</h5>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <div className="table-container">
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Descripción Producto</th>
                  <th>Precio</th>
                  <th>Categoria</th>
                </tr>
              </thead>
              <tbody>
                {productos
                  .filter((producto) => {
                    return search.toLocaleLowerCase() === ""
                      ? producto
                      : producto.codigo.toLowerCase().includes(search);
                  })
                  .map((producto) => (
                    <tr key={producto.id}>
                      <th className="text-style-none">{producto.codigo}</th>
                      <th className="text-style-none">
                        {producto.descripcion}
                      </th>
                      <th className="text-style-none">{producto.precio}</th>
                      <th className="text-style-none">{producto.categoria}</th>
                      <th className="text-style-none">
                        <Button
                          variant="primary"
                          onClick={() => {
                            agregarLineaVenta(producto);
                          }}
                        >
                          <i class="bi bi-cart-plus-fill"></i>
                        </Button>
                      </th>
                    </tr>
                  ))}
                {productos.filter((producto) =>
                  producto.codigo.toLowerCase().includes(search)
                ).length === 0 && (
                  <tr>
                    <td colSpan="5">
                      No se encontraron productos con el código ingresado.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
        <Col xs={6} className="d-flex flex-column justify-content-end">
          <LineasDeVenta
            lineasVenta={lineasVenta}
            setLineasVenta={setLineasVenta}
            total={total}
            setTotal={setTotal}
          ></LineasDeVenta>
        </Col>
      </Row>
    </>
  );
};

export default BuscarProducto;
