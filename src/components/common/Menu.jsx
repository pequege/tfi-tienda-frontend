import { Navbar, Container, Nav, Button } from "react-bootstrap";
import {Link, NavLink, useNavigate} from 'react-router-dom'

const Menu = ({usuarioLogueado, setUsuarioLogueado}) => {
  const navegacion = useNavigate()
  const cerrarSesion = ()=>{
    sessionStorage.removeItem('usuario');
    setUsuarioLogueado({})
    navegacion('/')
  } 

  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={'/ '}><i class="bi bi-shop"></i> Tienda</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink end className='nav-item nav-link' to='/'>Inicio</NavLink>
            {/* <NavLink end className='nav-item nav-link' to='/registro'>Registro</NavLink> */}
            {
              (usuarioLogueado.nombreUsuario)?
              <>
              <NavLink end className='nav-item nav-link' to='/administrador'>Administrador</NavLink>
              <Button variant="dark" onClick={cerrarSesion}>Logout</Button>
              </>:<NavLink end className='nav-item nav-link' to='/login'>Login</NavLink>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
