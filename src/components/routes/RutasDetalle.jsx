import { Routes, Route } from "react-router-dom";
import DetalleProducto from "../views/DetalleProducto";


const RutasDetalle = () => {
  return (
    <>
      <Routes>
        <Route exact path="/detalle/:id" element={<DetalleProducto></DetalleProducto>}></Route>
      </Routes>
    </>
  )
}

export default RutasDetalle;