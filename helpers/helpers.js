const  Base64 = require('crypto-js/enc-base64');
const  hmacSHA256 = require('crypto-js/hmac-sha256');

const getSignature = (obj, KEY) => {

   let content_signature = "";

   for (const property in obj) {
      content_signature += obj[property] + "+";
   }
   content_signature += KEY;

   const signature = Base64.stringify(hmacSHA256(content_signature, KEY))
  
   return signature;
  
}
const genRandonString = (length) => {
   var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charLength = chars.length;
   var result = '';
   for ( var i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
   }
   return result;
}

const getDateUTC = () => {
   /*const fecha = new Date(); // crea una nueva instancia del objeto Date
   console.log(fecha); // muestra la fecha y la hora actuales
   
   const año = fecha.getFullYear(); // obtiene el año actual (ejemplo: 2023)
   const mes = fecha.getMonth() + 1; // obtiene el mes actual (0-11) y le suma 1 (ejemplo: 3)
   const dia = fecha.getUTCDate(); // obtiene el día actual (1-31) (ejemplo: 1)
   const hora = fecha.getUTCHours(); // obtiene la hora actual (0-23) (ejemplo: 14)
   const minuto = fecha.getMinutes(); // obtiene los minutos actuales (0-59) (ejemplo: 11)
   const segundo = fecha.getSeconds(); // obtiene los segundos actuales (0-59) (ejemplo: 15)

   // concatena las partes de la fecha con ceros a la izquierda si es necesario
   const formato = año.toString() + mes.toString().padStart(2, '0') + dia.toString().padStart(2, '0') + hora.toString().padStart(2, '0') + minuto.toString().padStart(2, '0') + segundo.toString().padStart(2, '0');

   return (formato); // muestra la fecha en el formato deseado (ejemplo: 20230301141115)*/
   const fechaActual = new Date(); 
   const año = fechaActual.getFullYear(); 
   const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0"); 
   const día = fechaActual.getUTCDate().toString().padStart(2, "0"); 
   const hora = fechaActual.getUTCHours().toString().padStart(2, "0"); 
   const minuto = fechaActual.getMinutes().toString().padStart(2, "0"); 
   const segundo = fechaActual.getSeconds().toString().padStart(2, "0"); 
   const formattedDate = año + mes + día + hora + minuto + segundo;


   return  (formattedDate); // AAAAMDDHHMMSS ``
}

module.exports = { genRandonString, getDateUTC, getSignature };