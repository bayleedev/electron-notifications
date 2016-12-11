const { app, BrowserWindow } = require('electron')

let mainWindow = null

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL('file://' + __dirname + '/playbook.html')
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
