const { Client, MessageMedia} = require('../lib/whatsapp-web.js/index.js');
const qrcode = require('qrcode-terminal');
const { syncBuiltinESMExports } = require('module');

const client = new Client();

const country_code = "521";
const contactos = {
    "28 DE ENERO": {
        nombre: "Victor",
        telefono: "3314112084"
    }
};


client.on('qr', (qrCode) => {
    qrcode.generate(qrCode, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Web está listo!\n');

    console.log('------- MENU BOT -------\n');
    console.log('[1] Mandar mensaje\n');
    console.log('[2] Mandar cedula\n');
    console.log('[3] Mandar mandar archivo\n');
    console.log('[4] Mandar imagen\n');

    
    





//   enviarMensajesPers();
}); 

function enviarCedulas(chatId, unidad){
    // let ced = MessageMedia.fromFilePath(`./Docs/CEDS_ENVIO/${unidad}.pdf`);
    // let ced = MessageMedia.fromFilePath(`./Docs/RETO/${unidad}.pdf`);
    let ced = MessageMedia.fromFilePath(`./Docs/CUBETON/${unidad}.pdf`);

    client.sendMessage(chatId, ced).then((response) => {
        console.log('Cedula enviada con éxito a', chatId);
    }).catch((error) => {
        console.error('Error al enviar cedula a', chatId);
    });
}

function enviarImagen(chatId){
    const imagen = MessageMedia.fromFilePath('./carnet.jpeg');

    client.sendMessage(chatId, imagen).then((response) => {
        console.log('Imagen enviada con éxito a', chatId);
    }).catch((error) => {
        console.error('Error al imagen a', chatId);
    });
}

function enviarMensaje(chatId, mensajeTexto){
    const mensajeTexto = 'Hola, soy un bot';

    client.sendMessage(chatId, mensajeTexto).then((response) => {
        console.log('Mensaje enviado con éxito a', chatId);
    }).catch((error) => {
        console.error('Error al enviar el mensaje a', chatId);
    });
}

function enviarMensajesPers(){

    for(const unidad in contactos) {
        let chatId = country_code + contactos[unidad].telefono + "@c.us";
        let nombreLider = contactos[unidad].nombre;

            
        enviarMensaje(chatId);
        enviarCedulas(chatId, unidad);
        //enviarImagen(chatId);
    }
}

client.initialize();