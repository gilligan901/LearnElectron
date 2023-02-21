const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

const isMac = process.platform === 'darwin'
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form submission
  
  const name = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // insert data into MySQL database
  connection.query(
    'INSERT INTO users (name, password) VALUES (?, ?)',
    [name, password],\
    (error, results, fields) => {
      if (error) throw error;
      
      console.log('Data inserted successfully');
    }
  );
});


function createMainWindow () {
  const mainWindow = new BrowserWindow({
    title: 'My App',
    width: 400,
    height: 400,
  });

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))
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

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item',
        click(){
          createAddWindow();
        }
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