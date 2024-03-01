import { Container, Card, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProducto } from "../helpers/queries";


const DetalleProducto = () => {
  const {id} =useParams();
  console.log(id);

  const [producto, setProducto] = useState({});

  useEffect(()=>{
    obtenerProducto(id).then((respuesta)=>{
      if(respuesta){
        setProducto(respuesta);
      } else {
        Swal.fire("Error", "Intente realizar esta operacion en unos minutos", "error");
      }
    })
  }, []);

  return (
    <Container className="my-3 mainSection">
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img
              variant="top"
              src={producto.imagen}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{producto.descripcion}</Card.Title>
              <hr />
              <Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quasi alias similique.
              <br/>
              <br/>
              <span className="text-danger fw-semibold ">Categoria:</span> {producto.categoria}
              <br />
              <span className="text-danger fw-semibold ">Precio:</span> {producto.precio}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetalleProducto;
