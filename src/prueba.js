const { Client, MessageMedia} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
// const { syncBuiltinESMExports } = require('module');
const readline = require('readline');


const client = new Client();

const country_code = "521";

const contactos = {
  "CASTILLO_M": {
    nombre: "Liliana",
    telefono: "3339475170"
  },
  "CECY_M": {
    nombre: "Cecy",
    telefono: "13861036000"
  },
  "DALIAS_M": {
    nombre: "Mary",
    telefono: "3312197116"
  },
  "DESCUBRE_M": {
    nombre: "Silvia",
    telefono: "3322506214"
  },
  "LIDIA_M": {
    nombre: "Lilia",
    telefono: "13921001003"
  },
  "LUPITA 2_M": {
    nombre: "Bertha",
    telefono: "3314116538"
  },
  "MARISOL I_M": {
    nombre: "Marisol",
    telefono: "3316922969"
  },
  "NANCY_M": {
    nombre: "Nancy",
    telefono: "3841123686"
  },
  "NATALI CG_M": {
    nombre: "Sra. Chuy",
    telefono: "3331313021"
  },
  "NAZARET_M": {
    nombre: "Martha",
    telefono: "3314382260"
  },
  "PERLA_M": {
    nombre: "Ana",
    telefono: "3310061258"
  },
  "RISUEÑOS_M": {
    nombre: "Clau",
    telefono: "3334596028"
  },
  "ROSALES_M": {
    nombre: "Guillermina",
    telefono: "3741029658"
  },
  "YULIANA_M": {
    nombre: "Genoveva",
    telefono: "3787862592"
  }
}

// const contactos = {
//   "28 DE ENERO": { // NO TIENE ROMPE_2
//       nombre: "Tirza",
//       telefono: "3334475593"
//   },
//   "AGUILA": {
//       nombre: "Vicky",
//       telefono: "3334734202"
//   },
//   "ALCATRAZ": {
//       nombre: "Martha",
//       telefono: "3319722981"
//   },
//   "ANGELL": {
//       nombre: "Alma",
//       telefono: "3321081629"
//   },
//   "ARCOIRIS": {
//       nombre: "Elena",
//       telefono: "3334000135"
//   },
//   "CAMILA": {
//       nombre: "Cynthia",
//       telefono: "3310935078"
//   },
//   "CORAZON": { // NO TIENE ROMPE_1
//       nombre: "Nora",
//       telefono: "3841083282"
//   },
//   "EMYORO": {
//       nombre: "Rosaura",
//       telefono: "3315205802"
//   },
//   "EXITO": { // NO TIENE ROMPE_2
//       nombre: "Maury",
//       telefono: "3338148507"
//   },
//   "FENIX": {
//       nombre: "Martha",
//       telefono: "3327860871"
//   },
//   "GIRASOLES": {
//       nombre: "Tere",
//       telefono: "3334688082"
//   },
//   "GRANDESA": { // NO TIENE ROMPE_2
//       nombre: "Lupita",
//       telefono: "3334470497"
//   },
//   "JUAN PABLO": {
//       nombre: "Esther",
//       telefono: "3314552620"
//   },
//   "GRATITUD": {
//       nombre: "Clau",
//       telefono: "3316155687"
//   },
//   "LUPITA": { // NO TIENE ROMPE_2
//       nombre: "Elba",
//       telefono: "3314187627"
//   },
//   // "MARGARITAS": {
//   //   nombre: "Maggie",
//   //   telefono: "3314866473"
//   // },
//   "MAYA": {
//       nombre: "Ale",
//       telefono: "3313079272"
//   },
//   "MERAKI": {
//       nombre: "Maria",
//       telefono: "3881014832"
//   },
//   "NOVA": {
//       nombre: "Gris",
//       telefono: "3314175846"
//   },
//   "NUEVO AMANECER": {
//       nombre: "Vero",
//       telefono: "3171205613"
//   },
//   "ORQUIDEA": {
//       nombre: "Chely",
//       telefono: "3325368781"
//   },
//   "PALOMA": {
//       nombre: "Blanquita",
//       telefono: "3411379719"
//   },
//   "RENACIMIENTO": {
//       nombre: "Erika",
//       telefono: "3481167844"
//   },
//   "RESPLANDOR": {
//       nombre: "Paty",
//       telefono: "3751460106"
//   },
//   "SATELITE": { // NO TIENE ROMPE_2
//       nombre: "Rosy",
//       telefono: "3319180331"
//   },
//   "YARETZY": {
//       nombre: "Clau",
//       telefono: "3751313649"
//   },
//   "ZOE": {
//       nombre: "Martha",
//       telefono: "3317642629"
//   }
// };

const PRUEB = {
    "NOVA": {
        nombre: "Victor",
        telefono: "3314112084"
    },
    "AGUILA": {
        nombre: "Victor",
        telefono: "3314175846"
    },
    "EXITO": {
        nombre: "Victor",
        telefono: "3311729150"
    },
    "MAYA": {
        nombre: "Victor",
        telefono: "3318957592"
    },
    "ANGELL": {
        nombre: "Victor",
        telefono: "3321081629"
    }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function enviarMensaje(chatId, mensajeTexto, unidad){
  client.sendMessage(chatId, mensajeTexto).then((response) => {
      console.log('Mensaje enviado con éxito a', unidad);
  }).catch((error) => {
      console.error('Error al enviar el mensaje a', unidad);
  });
}

function sendFile(fileOption, filemessage){
  for(const unidad in contactos){
    let chatId = country_code + contactos[unidad].telefono + "@c.us";
    let file = MessageMedia.fromFilePath(`../docs/${fileOption}/${unidad}.pdf`);
    enviarMensaje(chatId, filemessage, unidad);
    client.sendMessage(chatId, file).then((response) => {
      console.log('Cedula enviada con éxito a', unidad);
    }).catch((error) => {
      console.error('Error al enviar cedula a', unidad);
    });
  }
}


function selectFileOption(selectActionCallback){
  console.log('[1] Cedulas');
  console.log('[2] Rompe Record I');
  console.log('[3] Rompe Record II');
  console.log('[4] Otro (en desarrollo)');
  console.log('[0] Atras');

  rl.question('\nElige un archivo: ', (archivo) => {
    switch (archivo) {
      case '1':
        sendFile('CEDS_N','*📊CEDULAS📊* - Resumen de Venta y Meta Nuevo Vallarta.');
        break;
      case '2':
        sendFile('RETO','*1️⃣ROMPE RECORD1️⃣* - Chicas que lograron la Primera Etapa, continuan con la Segunda Etapa.');
        break;
      case '3':
        sendFile('RETO2','*2️⃣ROMPE RECORD2️⃣* - Nueva Generación, chicas que no lograron entrar a la Primera Etapa, pero participan en el Rompe Record II.' );
        break;
      case '0':
          selectActionCallback();
          return;
      default:
        console.log('\n------- INVALIDA -------');
    }
    setTimeout(() => {
      selectActionCallback();
    }, 15000);
  });
}

function selectAction(){ 
  console.log('\n------- MENU BOT -------');
  console.log('[1] Mandar Archivo');
  console.log('[2] Mandar Mensaje');
  console.log('[0] Salir');
  rl.question('\nElige una opción: ', (selectOption) => {
    switch (selectOption) {
      case '1':
        console.log('\n------- ARCHIVOS -------');
        selectFileOption(selectAction);
        break;
      case '2':
        console.log('\n------- MENSAJES -------');
        for(const unidad in contactos){
          let chatId = country_code + contactos[unidad].telefono + "@c.us";
          filemessage = "Recuerda que este es el último TupperTips para participar en la meta de Nuevo Vallarta. ¡No te lo pierdas!"
          enviarMensaje(chatId, filemessage, unidad);
          client.sendMessage(chatId, file).then((response) => {
            console.log('Cedula enviada con éxito a', unidad);
          }).catch((error) => {
            console.error('Error al enviar cedula a', unidad);
          });
        }
        break;
      case '0':
        console.log('\n------- SALIENDO -------');
        process.exit();
      default:
        console.log('\n------- INVALIDA -------');
        selectAction();
    }
  });
}

client.on('qr', (qrCode) => {
    qrcode.generate(qrCode, { small: true });
});

client.on('ready', () => {
  selectAction();
}); 

client.initialize();