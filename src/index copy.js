const { Client, MessageMedia} = require('whatsapp-web.js');
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

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function realizarAccion(opcion) {
    switch (opcion) {
      case '1':
        console.log('Realizando acción 1: Mandar mensaje');
        // Agrega aquí la lógica para mandar un mensaje
        break;
      case '2':
        console.log('Realizando acción 2: Mandar cedula');
        // Agrega aquí la lógica para mandar una cédula
        break;
      case '3':
        console.log('Realizando acción 3: Mandar archivo');
        // Agrega aquí la lógica para mandar un archivo
        break;
      case '4':
        console.log('Realizando acción 4: Mandar imagen');
        // Agrega aquí la lógica para mandar una imagen
        break;
      case '0':
        console.log('Saliendo del programa.');
        rl.close(); // Cierra la interfaz readline y finaliza el programa
        return;
      default:
        console.log('Opción no válida. Por favor, elige una opción válida.');
    }
}

function mostrarMenu() {
    console.log('------- MENU BOT -------');
    console.log('[1] Mandar mensaje');
    console.log('[2] Mandar cedula');
    console.log('[3] Mandar mandar archivo');
    console.log('[4] Mandar imagen');
    console.log('[0] Salir');
  
    rl.question('Elige una opción: ', (opcion) => {
      realizarAccion(opcion);
  
      rl.question('¿Deseas realizar otra acción? (S/N): ', (respuesta) => {
        if (respuesta.toLowerCase() === 's') {
          // Si el usuario quiere realizar otra acción, muestra el menú nuevamente
          main();
        } else {
          console.log('Saliendo del programa.');
          rl.close(); // Cierra la interfaz readline y finaliza el programa
        }
      });
    });
  }

client.on('qr', (qrCode) => {
    qrcode.generate(qrCode, { small: true });
});

client.on('ready', () => {
    mostrarMenu();

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

client.initialize();