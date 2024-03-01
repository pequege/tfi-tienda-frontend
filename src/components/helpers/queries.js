//llamar a una variable de entorno
import axios from 'axios';
const URL_usuario = import.meta.env.VITE_API_USUARIO;
const URL_producto = import.meta.env.VITE_API_PRODUCTO;
const URL_decidir = import.meta.env.VITE_API_DECIDIR;
const URL_afip = import.meta.env.VITE_API_AFIP;
/*GET devuelven una lista de elementos
POST me permiten crear un elemento
PUT para editar todo el elemento/PATCH para editar parte del elemento /me permiten editar un elemento
DELETE me permite eliminar un elemento
*/
export const iniciarSesion = async (usuario) => {
    try {
        const respuesta = await fetch(URL_usuario);
        const listaUsuarios = await respuesta.json();
        const usuarioBuscado = listaUsuarios.find((itemUsuario) => itemUsuario.email === usuario.email);
        if (usuarioBuscado) {
            //email era correcto
            if (usuarioBuscado.password === usuario.password) {
                return usuarioBuscado
            } else {
                console.log('La contraseña es incorrecta')
                return null
            }
        } else {
            console.log('El mail no existe')
            //el email no exixte
            return null
        }
    } catch (error) {
        console.log(error);
    }
}

export const obtenerListaProductos = async () => {
    try {
        const respuesta = await fetch(URL_producto);
        const listaProductos = await respuesta.json();
        return listaProductos;
    } catch (error) {
        console.log(error)
    }
}

export const crearProducto = async (producto) => {
    try {
        const respuesta = await fetch(URL_producto, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });
        return respuesta;
    } catch (error) {
        console.log(error)
    }
}

export const editarProducto = async (producto, id) => {
    try {
        const respuesta = await fetch(URL_producto + '/' + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });
        return respuesta;
    } catch (error) {
        console.log(error)
    }
}

export const borrarProducto = async (id) => {
    try {
        const respuesta = await fetch(URL_producto + '/' + id, {
            method: "DELETE",
        });
        return respuesta;
    } catch (error) {
        console.log(error)
    }
}

export const obtenerProducto = async (id) => {
    try {
        const respuesta = await fetch(URL_producto + '/' + id);
        const producto = await respuesta.json();
        return producto;
    } catch (error) {
        console.log(error)
    }
}

export const solicitarTokenPago = async (datosCliente) => {
    try {
        const respuesta = await fetch(URL_decidir + "/tokens", {
            method: "POST",
            headers: {
                "apikey": "b192e4cb99564b84bf5db5550112adea",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "card_number": datosCliente.numeroTarjeta,
                "card_expiration_month": datosCliente.mesExpiracion,
                "card_expiration_year": datosCliente.anoExpiracion,
                "security_code": datosCliente.codigoSeguridad,
                "card_holder_name": datosCliente.nombreTitular,
                "card_holder_identification": {
                    "type": "dni",
                    "number": datosCliente.dniTitular
                }
            })
        });
        const querieTokenPago = await respuesta.json();
        return querieTokenPago.id;
    } catch (error) {
        console.log(error)
    }

}
export const confirmarPago = async (datosCliente, monto) => {
    try {
        const tokenPago = await solicitarTokenPago(datosCliente);
        const amount = (monto * 100);
        console.log(tokenPago);
        const respuesta = await fetch(URL_decidir + "/payments", {
            method: "POST",
            headers: {
                "apikey": "566f2c897b5e4bfaa0ec2452f5d67f13",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "site_transaction_id": "1256",
                "payment_method_id": 1,
                "bin": "450799",
                "token": tokenPago,
                "amount": amount,
                "currency": "ARS",
                "installments": 1,
                "description": "",
                "payment_type": "single",
                "establishment_name": "single",
                "sub_payments": []
            })
        });
        const statusPago = await respuesta.json();
        console.log(amount);
        console.log(statusPago.status);
        return respuesta;
    } catch (error) {
        console.log(error)
    }

}

