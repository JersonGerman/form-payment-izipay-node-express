# form-payment-izipay-node-express
Este proyecto es un ejemplo de un servidor en Nodejs que nos brinda dos Apis para crear un pago en los formularios de Izipay.

### CreatePayment
**POST:** Crear FormToken  
`http://localhost:4000/api/createPayment`  
**BODY:** json
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
**POST:** Verificar pago realizado
`http://localhost:4000/api/validatePayment`  
**BODY:** json  
```sh
{
    clientAnswer:{SHOPID:12345678,ORDERSTATUS:PAID,...}
    hash: "saw1c3x1c31c1sfdfae78ada8s7dasd6as6d7d7as6",
    hashKey: "sha256_hmac",
    hashAlgorith: "sha256_hmac"
    ...
}
```

## Requisitos previos
* Instalar la version LTS de [Node.js](https://nodejs.org) v16+ 
* Claves de Integración. [Guia para obtenerlo](https://github.com/izipay-pe/obtener-credenciales-de-conexion#obtener-credenciales-de-conexi%C3%B3n)

## 1.- Descargar proyecto
Descargar el proyecto .zip haciendo click [aquí](https://github.com/JersonGerman/form-payment-izipay-node-express/archive/refs/heads/main.zip), o clonarlo con git

```sh
git clone https://github.com/JersonGerman/form-payment-izipay-node-express.git
```

## 2.- Instalar dependencias
Instalar las dependecias del proyecto.

```sh
npm install
```

## 3.- Configurar Claves
Editar el archivo de configuración `.env.example`
```sh
ID_STORE=*********** Identifier of the store of your merchant
TEST_PASSWORD=************** Test password of your store
PROD_PASSWORD=************** PROD password of your store
TEST_KEY_HMAC_SHA_256=****************** HMAC TEST key of your trade
PROD_KEY_H,AC_SHA_256=****************** HMAC PROD key of your trade
```
## 4.- Iniciar Servidor
Iniciar  el servidor de desarrollo. 

```sh
npm start
```

Abrir en su navegador la siguiente URL

```sh
http://localhost:4000
```

Para más información acerca del formulario de Izipay consulte su documentación [Aquí](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/javascript/)
