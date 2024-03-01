import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Error404 from "./components/views/Error404";
import Menu from "./components/common/Menu";
import Footer from "./components/common/Footer";
import Inicio from "./components/views/Inicio";
import Login from "./components/views/Login";
import Registro from "./components/views/Registro";
import DetalleProducto from "./components/views/DetalleProducto";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import RutasProtegidas from "./components/routes/RutasProtegidas";
import RutasAdministrador from "./components/routes/RutasAdministrador";

function App() {

  const usuarioSessionStorage = JSON.parse(sessionStorage.getItem('usuario')) || {}
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioSessionStorage);

  return (
    <BrowserRouter>
      <Menu usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado}></Menu>
      <Routes>
        <Route exact path="/" element={<Inicio></Inicio>}></Route>
        <Route exact path="/registro" element={<Registro></Registro>}></Route>
        <Route exact path="/detalle/:id" element={<DetalleProducto></DetalleProducto>}></Route>
        <Route exact path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado}></Login>}></Route>
        <Route path="/administrador/*" element={
          <RutasProtegidas>
            <RutasAdministrador></RutasAdministrador>
          </RutasProtegidas>}>
        </Route>
        <Route exact path="*" element={<Error404></Error404>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
