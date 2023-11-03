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

const contacts = {
    "CASTILLO_M": {
      name: "Liliana",
      phone: "3339475170"
    },
    "CECY_M": {
      name: "Cecy",
      phone: "13861036000"
    },
    "DALIAS_M": {
      name: "Mary",
      phone: "3312197116"
    },
    "DESCUBRE_M": {
      name: "Silvia",
      phone: "3322506214"
    },
    "LIDIA_M": {
      name: "Lilia",
      phone: "13921001003"
    },
    "LUPITA 2_M": {
      name: "Bertha",
      phone: "3314116538"
    },
    "MARISOL I_M": {
      name: "Marisol",
      phone: "3316922969"
    },
    "NANCY_M": {
      name: "Nancy",
      phone: "3841123686"
    },
    "NATALI CG_M": {
      name: "Sra. Chuy",
      phone: "3331313021"
    },
    "NAZARET_M": {
      name: "Martha",
      phone: "3314382260"
    },
    "PERLA_M": {
      name: "Ana",
      phone: "3310061258"
    },
    "RISUEÑOS_M": {
      name: "Clau",
      phone: "3334596028"
    },
    "ROSALES_M": {
      name: "Guillermina",
      phone: "3741029658"
    },
    "YULIANA_M": {
      name: "Genoveva",
      phone: "3787862592"
    },
    "28 DE ENERO": {
        name: "Tirza",
        phone: "3334475593"
    },
    "AGUILA": {
        name: "Vicky",
        phone: "3334734202"
    },
    "ALCATRAZ": {
        name: "Martha",
        phone: "3319722981"
    },
    "ANGELL": {
        name: "Alma",
        phone: "3321081629"
    },
    "ARCOIRIS": {
        name: "Elena",
        phone: "3334000135"
    },
    "CAMILA": {
        name: "Cynthia",
        phone: "3310935078"
    },
    "CORAZON": {
        name: "Nora",
        phone: "3841083282"
    },
    "EMYORO": {
        name: "Rosaura",
        phone: "3315205802"
    },
    "EXITO": {
        name: "Maury",
        phone: "3338148507"
    },
    "FENIX": {
        name: "Martha",
        phone: "3327860871"
    },
    "GIRASOLES": {
        name: "Tere",
        phone: "3334688082"
    },
    "GRANDESA": {
        name: "Lupita",
        phone: "3334470497"
    },
    "JUAN PABLO": {
        name: "Esther",
        phone: "3314552620"
    },
    "GRATITUD": {
        name: "Clau",
        phone: "3316155687"
    },
    "LUPITA": {
        name: "Elba",
        phone: "3314187627"
    },
    "MARGARITAS": {
      name: "Maggie",
      phone: "3314866473"
    },
    "MAYA": {
        name: "Ale",
        phone: "3313079272"
    },
    "MERAKI": {
        name: "Maria",
        phone: "3881014832"
    },
    "NOVA": {
        name: "Gris",
        phone: "3314175846"
    },
    "NUEVO AMANECER": {
        name: "Vero",
        phone: "3171205613"
    },
    "ORQUIDEA": {
        name: "Chely",
        phone: "3325368781"
    },
    "PALOMA": {
        name: "Blanquita",
        phone: "3411379719"
    },
    "RENACIMIENTO": {
        name: "Erika",
        phone: "3481167844"
    },
    "RESPLANDOR": {
        name: "Paty",
        phone: "3751460106"
    },
    "SATELITE": {
        name: "Rosy",
        phone: "3319180331"
    },
    "YARETZY": {
        name: "Clau",
        phone: "3751313649"
    },
    "ZOE": {
        name: "Martha",
        phone: "3317642629"
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