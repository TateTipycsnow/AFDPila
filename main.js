//Funcionamiento central del programa
//Primero se referencia a  electron
const { app, BrowserWindow } = require('electron');

//Se crea una funcion para crear la ventana principal donde se especifican las caracteristicas de las ventanas
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, //informacion necesaria para el funcionamiento
            enableRemoteModule: true, //del js en estas ventanas, sin esto marca error
            nodeIntegrationInWorker: true //en la referencia de electron
        }
    });

    win.loadFile('index.html'); //Carga de la vista principal
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});