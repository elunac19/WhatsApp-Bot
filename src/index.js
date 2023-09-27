const { Client, MessageMedia} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { syncBuiltinESMExports } = require('module');

const client = new Client();

const country_code = "521";
// const contactos = {
//     "28 DE ENERO": {
//         nombre: "Victor",
//         telefono: "3314175846"
//     }
// };

const contactos = {
    "28 DE ENERO": {
        nombre: "Tirza",
        telefono: "3334475593"
    },
    "AGUILA": {
        nombre: "Vicky",
        telefono: "3334734202"
    },
    "ALCATRAZ": {
        nombre: "Martha",
        telefono: "3319722981"
    },
    "ANGELL": {
        nombre: "Alma",
        telefono: "3321081629"
    },
    "ARCOIRIS": {
        nombre: "Elena",
        telefono: "3334000135"
    },
    "CAMILA": {
        nombre: "Cynthia",
        telefono: "3310935078"
    },
    "CORAZON": {
        nombre: "Nora",
        telefono: "3841083282"
    },
    "DESAFIO": {
        nombre: "Elda",
        telefono: "3338157461"
    },
    "EMYORO": {
        nombre: "Rosaura",
        telefono: "3315205802"
    },
    "EXITO": {
        nombre: "Maury",
        telefono: "3338148507"
    },
    "FENIX": {
        nombre: "Martha",
        telefono: "3327860871"
    },
    "GIRASOLES": {
        nombre: "Tere",
        telefono: "3334688082"
    },
    "GRANDESA": {
        nombre: "Lupita",
        telefono: "3334470497"
    },
    "JUAN PABLO": {
        nombre: "Esther",
        telefono: "3314552620"
    },
    "GRATITUD": {
        nombre: "Clau",
        telefono: "3316155687"
    },
    "LUPITA": {
        nombre: "Elba",
        telefono: "3314187627"
    },
    "MAYA": {
        nombre: "Ale",
        telefono: "3313079272"
    },
    "MERAKI": {
        nombre: "Maria",
        telefono: "3881014832"
    },
    "NOVA": {
        nombre: "Gris",
        telefono: "3314175846"
    },
    "NUEVO AMANECER": {
        nombre: "Vero",
        telefono: "3171205613"
    },
    "ORQUIDEA": {
        nombre: "Chely",
        telefono: "3325368781"
    },
    "PALOMA": {
        nombre: "Blanquita",
        telefono: "3411379719"
    },
    "RENACIMIENTO": {
        nombre: "Erika",
        telefono: "3481167844"
    },
    "RESPLANDOR": {
        nombre: "Paty",
        telefono: "3751460106"
    },
    "SATELITE": {
        nombre: "Rosy",
        telefono: "3319180331"
    },
    "YARETZY": {
        nombre: "Clau",
        telefono: "3751313649"
    },
    "ZOE": {
        nombre: "Martha",
        telefono: "3317642629"
    }
};

client.on('qr', (qrCode) => {
  qrcode.generate(qrCode, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp Web está listo!');
  enviarMensajesPers();
}); 

function enviarCedulas(chatId, unidad){
    // let ced = MessageMedia.fromFilePath(`CEDS_ENVIO/${unidad}.pdf`);
    // let ced = MessageMedia.fromFilePath(`../docs/RETO/${unidad}.pdf`);
    let ced = MessageMedia.fromFilePath(`../docs/RETO2/${unidad}.pdf`);

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

//         let mensajeTexto = `¡Hola a ${nombreLider}! 👋🌟

// 🌈 Me disculpo por la ausencia de la semana pasada. Hoy es el día de la entrega de nuestro seguimiento de ventas y promociones.`;

        // let mensajeTexto = `*📊CEDULAS📊* - Resumen de Venta y Meta Nvo Vallarta.`;
        // let mensajeTexto = `Buenas noches, una disculpa por comunicarme a esta hora. Lo hago principalmente para comentarte que hubo un error en el Rompe Record, así que se las volveré a enviar.`;
        // let mensajeTexto = `*1️⃣ROMPE RECORD1️⃣* - Chicas que lograron la Primera Etapa, continuan con la Segunda Etapa.`;
        let mensajeTexto = `*2️⃣ROMPE RECORD2️⃣* - Nueva Generación, chicas que no lograron entrar a la Primera Etapa, pero participan en el Rompe Record II.`;
            
        enviarMensaje(chatId, mensajeTexto);
        enviarCedulas(chatId, unidad);
        
        //enviarImagen(chatId);
    }
}

client.initialize();