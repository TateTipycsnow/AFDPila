//referencia a los modulos de electron y de path para la redireccion de ventanas
const { BrowserWindow } = require('electron').remote;
const path = require('path');

//referencia a los botones de la ventana principal, para hacer el redirecionamiento a sus ventanas respectivas
const firstButton = document.getElementById('1erAFD');
const secondButton = document.getElementById('2ndAFD');

//evento de cuando se hace click al primer afd, haciendo su redireccionamiento
firstButton.addEventListener('click', (event) => {
    const afd1er = path.join('file://', __dirname, '/windows/Primer AFD/1erAFD.html'); //uso de path para especificar la ruto de la vista del afd

    let ventana1 = new BrowserWindow({
        width: 700,
        height: 500,
        webPreferences: {
            nodeIntegration: true, //informacion necesaria para el funcionamiento
            enableRemoteModule: true, //del js en estas ventanas, sin esto marca error
            nodeIntegrationInWorker: true //en la referencia de electron
        }
    });

    ventana1.on('close', () => { ventana1 = null });
    ventana1.loadURL(afd1er); //Busca la ruta de la vista
    ventana1.show(); //Y carga la vista de esta misma
});

//Misma estructura de codigo, con el mismo funcionamiento pero para el segundo afd
secondButton.addEventListener('click', (event) => {
    const afd2nd = path.join('file://', __dirname, '/windows/Segundo AFD/2ndAFD.html');

    let ventana2 = new BrowserWindow({
        width: 700,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            nodeIntegrationInWorker: true
        }
    });

    ventana2.on('close', () => { ventana2 = null });
    ventana2.loadURL(afd2nd);
    ventana2.show();
});