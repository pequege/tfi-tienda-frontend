import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  confirmarPago,
  obtenerListaProductos,
} from "../helpers/queries";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import BuscarProducto from "./venta/BuscarProducto";

const CrearVenta = () => {
  useEffect(() => {
    obtenerListaProductos().then((respuesta) => {
      if (respuesta) {
        setProductos(respuesta);
      } else {
        Swal.fire(
          "Error",
          "Intente realizar esta operación en unos minutos",
          "error"
        );
      }
    });
  }, []);

  const [productos, setProductos] = useState([]);
  const [lineasVenta, setLineasVenta] = useState([]);
  const [metodoPago, setMetodoPago] = useState("1");
  const [dineroRecibido, setDineroRecibido] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    actualizarLineasDeVenta;
    //consultar a la api y guardar la respuesta en el state
    obtenerListaProductos().then((respuesta) => {
      if (respuesta) {
        setProductos(respuesta);
      } else {
        Swal.fire(
          "Error",
          "Intente realizar esta operación en unos minutos",
          "error"
        );
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const actualizarLineasDeVenta = () => {
    const storedLineasVenta = JSON.parse(localStorage.getItem("lineasVenta"));
    setLineasVenta(storedLineasVenta);
  };

  const onSubmit = async() => {
    //informar a afip
    const {
      numeroTarjeta,
      mesExpiracion,
      anoExpiracion,
      codigoSeguridad,
      nombreTitular,
      dniTitular,
    } = getValues();
    const venta = {
      fecha: Date().toLocaleString("en-GB", {
        hour12: false,
      }),
      lineasDeVenta: lineasVenta,
      codigoVenta: "4",
      metodoPago: metodoPago,
      datosCliente: {
        numeroTarjeta: numeroTarjeta,
        mesExpiracion: mesExpiracion,
        anoExpiracion: anoExpiracion,
        codigoSeguridad: codigoSeguridad,
        nombreTitular: nombreTitular,
        dniTitular: dniTitular,
      },
    }
    try {
      const confirmacionDePago = await confirmarPago(venta.datosCliente, total);
      console.log(confirmacionDePago);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container mainSection mb-5">
      <h1 className="display-4 mt-5">Nueva Venta</h1>
      <hr />
      <Row>
        <BuscarProducto
          productos={productos}
          actualizarLineasDeVenta={actualizarLineasDeVenta}
          total={total}
          setTotal={setTotal}
        ></BuscarProducto>
      </Row>
      <hr />
      <span className="display-5">Forma de pago</span>
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <Row>
          <Col xs={6}>
            <Form.Group>
              <Form.Label>Método de Pago</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setMetodoPago(e.target.value);
                }}
              >
                <option value="1">Efectivo</option>
                <option value="2">Tarjeta Débito</option>
                <option value="3" disabled>
                  Tarjeta Crédito
                </option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Group
              className="mb-3"
              controlId="dineroRecibido.ControlInput"
              onChange={(e) => {
                setDineroRecibido(e.target.value);
              }}
            >
              <Form.Label>Dinero Recibido</Form.Label>
              <Form.Control
                type="number"
                placeholder="$0.00"
                min={0}
                disabled={metodoPago != "1"}
              />
            </Form.Group>
          </Col>
          <Col xs={3}>
            <div className="mb-3">
              <label htmlFor="">Vuelto: </label>
              <h5 className="m-2">$ {dineroRecibido > total ? (dineroRecibido - total) : ""} </h5>
            </div>
          </Col>
        </Row>
        {metodoPago === "1" ? (
          ""
        ) : (
          <>
            <hr />
            <span className="display-5">Datos cliente</span>
            <Form.Group controlId="numeroTarjetaInput" className="mt-3">
              <Form.Label>Numero Tarjeta</Form.Label>
              <Form.Control
                type="number"
                {...register("numeroTarjeta", {
                  required: "Ingrese el número de tarjeta del Titular",
                  minLength: {
                    value: 16,
                    message: "",
                  },
                  maxLength: {
                    value: 16,
                    message: "",
                  },
                })}
              ></Form.Control>
            </Form.Group>
            <Row>
              <Col xs={6}>
                <Form.Group controlId="expiracionTarjetaInput">
                  <Form.Label>Fecha de Expiración</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      className="me-2"
                      as="select"
                      {...register("mesExpiracion", {
                        required: "Por favor selecciona un mes de expiración.",
                      })}
                    >
                      {[...Array(12)].map((_, index) => {
                        const monthNumber = index + 1;
                        return (
                          <option
                            key={monthNumber}
                            value={monthNumber.toString().padStart(2, "0")}
                          >
                            {monthNumber.toString().padStart(2, "0")}
                          </option>
                        );
                      })}
                    </Form.Control>
                    <Form.Control
                      as="select"
                      {...register("anoExpiracion", {
                        required: "Por favor selecciona un año de expiración.",
                      })}
                    >
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                    </Form.Control>
                  </div>
                  <div className="text-danger">
                    {errors.mesExpiracion && errors.mesExpiracion.message}
                    {errors.anoExpiracion && errors.anoExpiracion.message}
                  </div>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="codigoSeguridadInput">
                  <Form.Label>Código de seguridad</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="***"
                    {...register("codigoSeguridad", {
                      required: "Ingrese el código de seguridad de la tarjeta",
                      minLength: {
                        value: 3,
                        message: "",
                      },
                      maxLength: {
                        value: 3,
                        message: "",
                      },
                    })}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Form.Group controlId="nombreTitularInput">
                  <Form.Label>Nombre del Titular</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    {...register("nombreTitular", {
                      required: "Ingrese el nombre del Titular",
                      minLength: {
                        value: 5,
                        message:
                          "La longitud mínima del nombre es de 5 caracteres",
                      },
                      maxLength: {
                        value: 30,
                        message:
                          "La longitud máxima del código es de 30 caracteres",
                      },
                    })}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="dniTitularInput">
                  <Form.Label>DNI del Titular</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="99.999.999"
                    {...register("dniTitular", {
                      required: "",
                      minLength: {
                        value: 7,
                        message: "",
                      },
                      maxLength: {
                        value: 8,
                        message: "",
                      },
                    })}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </>
        )}
        <hr />
        <div className="text-end">
          <Button className="m-3 fs-4" variant="success" type="submit">
            Confirmar
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default CrearVenta;
