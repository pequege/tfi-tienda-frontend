import { Routes, Route } from "react-router-dom";
import Administrador from "../views/Administrador";
import CrearProducto from "../views/producto/CrearProducto";
import EditarProducto from "../views/producto/EditarProducto";
import CrearVenta from "../views/CrearVenta";


const RutasAdministrador = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Administrador></Administrador>}></Route>
                <Route exact path="/crear-producto" element={<CrearProducto></CrearProducto>}></Route>
                <Route exact path="/editar-producto/:id" element={<EditarProducto></EditarProducto>}></Route>
                <Route exact path="/venta" element={<CrearVenta></CrearVenta>}></Route>
            </Routes>
        </>
    );
};

export default RutasAdministrador;