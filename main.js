// Modules to control application life and create native browser window
const {app, BrowserWindow, shell} = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 800,
    icon: __dirname + '/webex.png',
    webPreferences: {
      sandbox: true,
      nodeIntegration: false,
      disableBlinkFeatures: "Auxclick",
      contextIsolation: true
    }

  })

  /*
  Steps to do:
  1. Create a file called token in the same directory as main.js
  2. In a logged in Webex browser window, run the following command in the javascript console:
  copy(sessionStorage.getItem('web-client-internal-bounded'))
  3. Paste the contents in token files. This is your session token for webex.
  */
  const token = fs.readFileSync(path.join(__dirname, "token"), "utf8");

  const cmd = 'sessionStorage.setItem("web-client-internal-bounded",\''+token+'\');'

  //console.log(cmd)
  
  mainWindow.webContents.executeJavaScript(cmd, true)
              .then((result) => {
                console.log() 

              }).catch(error => console.log(error.message));

  mainWindow.loadURL('https://teams.webex.com/spaces')

  setTimeout(function(){console.log("reloading");mainWindow.reload();}, 1000);

  const checkIfUrlIsTrusted = async (evt, urlString) => {
    // Note: Links without target="_blank" will not go through this
    evt.preventDefault()

    const webexTeamsHostname = "teams.webex.com";

    try {
      const { hostname, protocol } = new URL(urlString)
      if (protocol !== 'https:'  ) {
        throw new Error(`URL Scheme "${urlString}" is not supported`)
      }

      if (
        hostname !== webexTeamsHostname ||
        hostname.includes('/') ||
        urlString.includes('@') ||
        urlString.includes('\\')
        ){
          //Open non teams.webex.com links in default browser
          shell.openExternal(urlString)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  mainWindow.webContents.on('will-navigate', checkIfUrlIsTrusted)
  mainWindow.webContents.on('new-window', checkIfUrlIsTrusted)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


