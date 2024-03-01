import { Container, Row } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { useState, useEffect } from "react";
import { obtenerListaProductos } from "../helpers/queries";
const Inicio = () => {

  const[productos, SetProductos] = useState([]);

  useEffect(()=>{
    obtenerListaProductos().then((respuesta)=>{
      if(respuesta){
        SetProductos(respuesta);
      } else {
        Swal.fire("Error", "Intente realizar esta operacion en unos minutos", "error");
      }
    })
  }, [])
  return (
    <section className="mainSection">
      <Container>
        <h1 className="display-4">Nuestros Productos</h1>
        <hr />
        <Row>
            {
              productos.map((producto)=> <CardProducto key={producto._id} producto={producto}></CardProducto>)
            }
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;