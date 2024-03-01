import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { borrarProducto } from "../../helpers/queries";

const ItemProducto = ({ producto, productos, setProductos }) => {

  const handleDelete = ()=>{
    Swal.fire({
      title: 'Esta seguro de borrar el siguiente producto?',
      text: "El siguiente cambio no podra ser revertido",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '000',
      confirmButtonText: 'Si, quiero borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        borrarProducto(producto._id).then((respuesta)=>{
          if(respuesta.status === 200){
            eliminarProducto();
            Swal.fire(
              'Borrado!',
              'El producto fue borrado.',
              'success'
            )
          }else{
            Swal.fire({
              title: "Lo siento!",
              text: "El producto no pudo ser eliminada.",
              icon: "error",
              confirmButtonColor: "#fa8072",
            });
          }
        })
      }
    })
  }

  const eliminarProducto = () =>{
    const nuevaListaProducto = productos.filter((productoFiltrado) => productoFiltrado !== producto);
    setProductos(nuevaListaProducto);
  }

  return (
    <tr>
      <td># {producto.codigo}</td>
      <td>{producto.cantidad}</td>
      <td>{producto.marca}</td>
      <td>
        <span className="d-inline-block text-truncate">
          {producto.descripcion}
        </span>
      </td>
      <td>${producto.costo}</td>
      <td>${producto.precio}</td>
      <td>
        <span className="d-inline-block text-truncate">
          {producto.imagen}
        </span>
      </td>
      <td>{producto.categoria}</td>
      <td>
        <Link className="btn btn-warning mx-1" to={'/administrador/editar-producto/'+producto.id}><i class="bi bi-pencil-square"></i></Link>
        <Button variant="danger" onClick={handleDelete}>
          <i class="bi bi-trash-fill"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
