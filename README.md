# form-payment-izipay-node-express
Este proyecto es un ejemplo de un servidor en Nodejs que nos brinda dos Apis para crear un pago en los formularios de Izipay.



### CreatePayment
**POST** Crear FormToken  
`http://localhost:4000/api/createPayment`
**BODY** json
```sh
{
    amount: 5,
    currency: USD,
    customer: {
        email: "example@gmail.com"
    },
    orderId: pedido-123
}
```

### ValidatePayment
**POST** Verificar pago realizado
`http://localhost:4000/api/validatePayment`
**BODY** json
```sh
{
    clientAnswer:{SHOPID:12345678,ORDERSTATUS:PAID,...}
    hash: "saw1c3x1c31c1sfdfae78ada8s7dasd6as6d7d7as6",
    hashKey: "sha256_hmac",
    hashAlgorith: "sha256_hmac"
    ...
}
```

## Instalación

Instalar la version LTS de [Node.js](https://nodejs.org) v16+ 

clonar el repositorio.

```sh
git clone https://github.com/JersonGerman/form-payment-izipay-node-express.git
```

Instalar las dependecias del proyecto.

```sh
npm install
```

Iniciar  el servidor de desarrollo. 

```sh
npm start
```

Abrir en su navegador la siguiente URL

```sh
http://localhost:4000
```

Para más información acerca del formulario de Izipay consulte su documentación [Aquí](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/javascript/)
