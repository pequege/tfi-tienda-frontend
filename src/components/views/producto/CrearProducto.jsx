import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearProducto } from "../../helpers/queries";
import Swal from "sweetalert2";
import { useState } from "react";

const CrearProducto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Remera");
  const [tallesPorCategoria, setTallesPorCategoria] = useState({
    Remera: ['S', 'M', 'L'],
    Pantalón: ['XS', 'S', 'M', 'L', 'XL'],
    Calzado: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
  });

  const onSubmit = (productoNuevo) => {
    console.log(productoNuevo);
    crearProducto(productoNuevo).then((respuesta) => {
      if (respuesta.status === 201) {
        Swal.fire(
          "Producto creado",
          `El producto ${productoNuevo.descripcion} fue creado correctamente`,
          "success"
        );
        reset();
      } else {
        Swal.fire(
          "Ocurrio un error",
          `El producto ${productoNuevo.descripcion} no pudo ser creado`,
          "error"
        );
      }
    });
  };

  return (
    <section className="container mainSection mb-5">
      <h1 className="display-4 mt-5">Nuevo producto</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* codigo */}
        <Form.Group className="mb-3" controlId="formCodigo">
          <Form.Label>Código *</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 12345"
            {...register("codigo", {
              required: "El Código del producto es obligatorio",
              minLength: {
                value: 1,
                message: "La longitud mínima del Código es de 1 caracteres",
              },
              maxLength: {
                value: 1000,
                message: "La longitud máxima del código es de 4 caracteres",
              },
              max: {
                value: 9999,
                message: "El Código máximo es de 9999",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.codigo?.message}
          </Form.Text>
        </Form.Group>
        {/* Marca */}
        <Form.Group className="mb-3" controlId="formMarca">
          <Form.Label>Marca *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Adibas, Mike, Pumba"
            {...register("marca", {
              required: "La marca del producto es obligatoria",
              minLength: {
                value: 2,
                message: "La cantidad minima de caracteres es de 2 digitos",
              },
              maxLength: {
                value: 100,
                message: "La cantidad maxima de caracteres es de 100 digitos",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.marca?.message}</Form.Text>
        </Form.Group>
        {/* descripcion */}
        <Form.Group className="mb-3" controlId="formDescripcionProducto">
          <Form.Label>Descripción*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Remera Adidas, Zapatilla Nike"
            {...register("descripcion", {
              required: "La descripción del producto es obligatorio",
              minLength: {
                value: 2,
                message: "La cantidad minima de caracteres es de 2 digitos",
              },
              maxLength: {
                value: 100,
                message: "La cantidad maxima de caracteres es de 100 digitos",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcion?.message}
          </Form.Text>
        </Form.Group>
        {/* costo */}
        <Form.Group className="mb-3" controlId="formCosto">
          <Form.Label>Costo *</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            {...register("costo", {
              required: "El costo del producto es obligatorio",
              min: {
                value: 1,
                message: "El costo minimo es de $1",
              },
              max: {
                value: 100000,
                message: "El costo maximo es de $100000",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.costo?.message}</Form.Text>
        </Form.Group>
        {/* cantidad */}
        <Form.Group className="mb-3" controlId="formCantidad">
          <Form.Label>Cantidad *</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 100"
            {...register("cantidad", {
              required: "La Cantidad del producto es obligatoria",
              min: {
                value: 1,
                message: "La Cantidad minima es 1",
              },
              max: {
                value: 1000,
                message: "La Cantidad maxima es 1000",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.cantidad?.message}
          </Form.Text>
        </Form.Group>
        {/* imagen url */}
        <Form.Group className="mb-3" controlId="formUrl">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            {...register("imagen", {
              required: "La imagen es obligatoria",
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        {/* categoria */}
        <Form.Group className="mb-3" controlId="formCategoria">
          <Form.Label>Categoria *</Form.Label>
          <Form.Select
            onClick={(e) => {
              setCategoriaSeleccionada(e.target.value)
            }}
            {...register("categoria", {
              required: "La categoria es obligatoria",
            })}
          >
            <option value="Remera">Remera</option>
            <option value="Pantalón">Pantalón</option>
            <option value="Calzado">Calzado</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        {/* color */}
        <Form.Group className="mb-3" controlId="formColor">
          <Form.Label>Color *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: rojo, azul, verde"
            {...register("color", {
              required: "El color del producto es obligatoria",
              minLength: {
                value: 1,
                message: "El color minima de caracteres es de 1 digito",
              },
              maxLength: {
                value: 15,
                message: "La cantidad maxima de caracteres es de 15 digitos",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.color?.message}</Form.Text>
        </Form.Group>
        {/* talle */}
        <Form.Group className="mb-3" controlId="formTalle">
          <Form.Label>Talle *</Form.Label>
          <Form.Select
            defaultValue={tallesPorCategoria[categoriaSeleccionada][0]}
            {...register("talle", {
              required: "El talle es obligatorio",
            })}
          >
            {tallesPorCategoria[categoriaSeleccionada].map((talle, index) => (
              <option key={index} value={talle}>
                {talle}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="text-danger">{errors.talle?.message}</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default CrearProducto;
