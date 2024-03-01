import { Col, Row, Table } from "react-bootstrap";
import ItemLineaVenta from "./ItemLineaVenta";
import { useEffect, useState } from "react";


const LineasDeVenta = ({ lineasVenta, setLineasVenta, total, setTotal }) => {
  const eliminarLineaVenta = (codigoAEliminar) => {
    // Crea una nueva arrau excluyendo la línea de venta con el codigoAEliminar proporcionado
    const nuevaLineasVenta = lineasVenta.filter(
      (linea) => linea.codigoProducto !== codigoAEliminar
    );
    // Actualiza el estado lineasVenta con el nuevo arrau
    setLineasVenta(nuevaLineasVenta);
  };
  
  const actualizarTotal = () => {
    let nuevoTotal = 0;
    lineasVenta.forEach((linea) => {
      nuevoTotal += linea.precio * linea.cantidad;
    });
    setTotal(nuevoTotal);
  };
  useEffect(() => {
    actualizarTotal();
  }, [lineasVenta]);
  return (
    <>
      <Row>
        <div className="table-container">
          <Table responsive striped bordered hover className="h-100">
            <tbody>
              {lineasVenta.map((linea, index) => (
                <ItemLineaVenta
                  key={index}
                  codigo={linea.codigoProducto}
                  descripcion={linea.descripcion}
                  cantidad={linea.cantidad}
                  precio={linea.precio}
                  eliminarLineaVenta={eliminarLineaVenta}
                ></ItemLineaVenta>
              ))}
            </tbody>
          </Table>
        </div>
      </Row>
      <Row className="m-3 pe-5 text-end">
        <h5>Total $ {total}</h5>
      </Row>
    </>
  );
};

export default LineasDeVenta;
