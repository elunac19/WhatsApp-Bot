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
    '28 DE ENERO': {
        name: "Rodrigo",
        phone: "3311919257" 
    },
    "MAYA": {
        name: "Andrea",
        phone: "3318957592"
    },
}


function messageSender(chatId, textMessage, unidad){
    client.sendMessage(chatId, textMessage).then((response) => {
        console.log('Mensaje enviado con éxito a', unidad);
    }).catch((error) => {
        console.error('Error al enviar el mensaje a', unidad);
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

                    if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {
                      const files = fs.readdirSync(folderPath);
                
                        files.forEach((fileName) => {
                            const contactName = fileName.replace('.pdf', '');
                            

                            if (contacts[contactName]) {
                                const contact = contacts[contactName];
                                const chatId = country_code + contact.phone + "@c.us";
                                rl.question('\nEscribe tu mensaje: ', (text) =>{
                                    message = text;
                                    messageSender(chatId, message, contactName);
                                });
                            }
                        });
                    } 
                    else {
                      console.log(`La carpeta ${folderName} no existe.`);
                    }
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
                // selectFileOption(selectAction);
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