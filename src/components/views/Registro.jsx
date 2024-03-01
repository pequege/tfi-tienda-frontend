
import { Button, Form } from "react-bootstrap";

const Registro = () => {
  return (
    <div className="mt-5 mainSection">
      <h3 className="text-center">Registro</h3>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <Form>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Ingrese un nombre de usuario"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control placeholder="Ingrese un email" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control type="password" placeholder="Ingrese un password" />
            </Form.Group>
            <div className="row">
              <Button
                className="btn btn-dark btn-lg btn-block mb-2"
                type="submit"
              >
                Registrar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
