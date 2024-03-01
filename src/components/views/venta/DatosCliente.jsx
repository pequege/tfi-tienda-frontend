import { useState } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const DatosCliente = () => {
  const [datosCliente, setDatosCliente] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = () => {};

  return (
    <>
      
    </>
  );
};

export default DatosCliente;
