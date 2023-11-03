const { Client, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const readline = require('readline');
const { group } = require('console');
const fs = require('fs');
const path = require('path');


const client = new Client({
    authStrategy: new LocalAuth()
});
 
const country_code = "521";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
    },
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
    "MARGARITAS": {
      nombre: "Maggie",
      telefono: "3314866473"
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


function messageSender(chatId, textMessage, unidad){
    client.sendMessage(chatId, textMessage).then((response) => {
        console.log('Mensaje enviado con éxito a', unidad);
    }).catch((error) => {
        console.error('Error al enviar el mensaje a', unidad);
    });
}

function sendFile(chatId, unidad, folder){
    let file = MessageMedia.fromFilePath(`../docs/${folder}/${unidad}.pdf`);
    client.sendMessage(chatId, file).then((response) => {
      console.log('Cedula enviada con éxito a', unidad);
    }).catch((error) => {
      console.error('Error al enviar cedula a', unidad);
    });
}

function selectMessageOption(selectActionCallback){
    console.log('[1] Mensaje Todas');
    console.log('[2] Mensaje Dirigido');
    console.log('[3] Mensaje Por Carpeta');
    console.log('[0] Atras');

    rl.question('\nElige un método de mensaje: ', (selectedMessage) =>{
        let message;
        switch(selectedMessage){
            case '1':
                rl.question('\nEscribe tu mensaje: ', (text) => {
                    message = text;
                    for(const group in contacts){
                        let chatId = country_code + contacts[group].phone + "@c.us";
                        messageSender(chatId, message, group);
                    }
                });
                break;
            case '2':
                rl.question('\nEscribe el nombre de la Unidad: ', (group) => {
                    const verify = contacts[group];
                    if(verify){
                        let chatId = country_code + verify.phone + "@c.us";
                        rl.question('\nEscribe tu mensaje: ', (text) =>{
                            message = text;
                            messageSender(chatId, message, group);
                        });
                    }
                    else{
                        console.log('Unidad no encontrada');
                    }
                });
                break;
            case '3':

                rl.question('\nEscribe la carpeta: ', (folder) => {
                    const folderPath = path.resolve(__dirname, '../docs', folder);
                    rl.question('\nEscribe tu mensaje: ', (text) =>{
                        const message = text;
                        if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {
                            const files = fs.readdirSync(folderPath);
                            
                            files.forEach((fileName) => {
                                let contactName = fileName.replace('.pdf', '');
                                
                                if (contacts[contactName]) {
                                    const contact = contacts[contactName];
                                    const chatId = country_code + contact.phone + "@c.us";
                                    messageSender(chatId, message, contactName);
                                }
                            });
                        } 
                        else {
                            console.log(`La carpeta ${folderName} no existe.`);
                        }
                    });
                });
                
                break;
            case '0':
                  selectActionCallback();
                  return;
            default:
                console.log('\n------- INVALIDA -------');
        }
        setTimeout(() => {
            selectActionCallback();
          }, 20000);
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

                rl.question('\nEscribe la carpeta: ', (folder) => {
                    const folderPath = path.resolve(__dirname, '../docs', folder);
                    rl.question('\nEscribe tu mensaje: ', (text) =>{
                        const message = text;
                        if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {
                            const files = fs.readdirSync(folderPath);
                            
                            files.forEach((fileName) => {
                                let contactName = fileName.replace('.pdf', '');
                                
                                if (contacts[contactName]) {
                                    const contact = contacts[contactName];
                                    const chatId = country_code + contact.phone + "@c.us";
                                    messageSender(chatId, message, contactName);
                                    sendFile(chatId, contactName, folder);
                                }
                            });
                        } 
                        else {
                            console.log(`La carpeta ${folderName} no existe.`);
                        }
                        setTimeout(() => {
                            selectAction();
                        }, 20000);
                    });
                });
                
                break;
            case '2':
                console.log('\n------- MENSAJES -------');
                selectMessageOption(selectAction);
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