const { app, BrowserWindow, Menu, ipcMain, MenuItem } = require('electron')
const path = require('path')
const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'your_username',
//   password: 'your_password',
//   database: 'your_database'
// });

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

let mainWindow = null;

function createMainWindow () {
  mainWindow = new BrowserWindow({
    title: 'My App',
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: true 
    }
  });

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))

  if (isDev) { mainWindow.webContents.openDevTools() }  
}

app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);
})

// Handle creat add window
function createAddWindow(){
  const addWindow = new BrowserWindow({
    title: 'My App',
    width: 400,
    height: 400,
  });

  addWindow.loadFile(path.join(__dirname, './renderer/index.html'))
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// catch username
ipcMain.on('add:username', (e, username) => {
  console.log(username);
  mainWindow.webContents.send('add:username', username)
});

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        role: 'reload'
      },
      {
        label: 'Clear Items'
      },
      {
        label :'Quit',
        accelerator : isMac ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
]