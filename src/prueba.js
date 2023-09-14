// Import the readline module
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('WhatsApp Web está listo!\n');

    console.log('------- MENU BOT -------\n');
    console.log('[1] Mandar mensaje\n');
    console.log('[2] Mandar cedula\n');
    console.log('[3] Mandar archivo\n');
    console.log('[4] Mandar imagen\n');

    rl.question('Seleccione una opción: ', (option) => {
        // Aquí puedes verificar la opción seleccionada y tomar acciones en consecuencia
        switch (option) {
            case '1':
                // Código para mandar mensaje
                console.log('MENSAJE');
                break;
            case '2':
                // Código para mandar cédula
                console.log('MENSAJE');

                break;
            case '3':
                // Código para mandar archivo
                console.log('MENSAJE');

                break;
            case '4':
                // Código para mandar imagen
                console.log('MENSAJE');

                break;
            default:
                console.log('Opción no válida.');
                break;
        }

        rl.close();
    });