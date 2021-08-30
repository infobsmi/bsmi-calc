
const {app, BrowserWindow, ipcMain, remote, Menu} = require('electron');
const url = require("url");
const path = require("path");





const originWidth = 800;
const originHeight = 600;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: originWidth,
    height: originHeight

  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
    query: {
      //args: deeplinkingUrl
    }
  }));

  // Open the DevTools.
 // mainWindow.webContents.openDevTools();
 // mainWindow.setResizable(false);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setMenu(null);



};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('browser-window-created', (evt, win) => {




  win.webContents.on('context-menu', (e, props) => {
    const InputMenu = Menu.buildFromTemplate([ {
      label: '剪切',
      role: 'cut',
    }, {
      label: '复制',
      role: 'copy',
    }, {
      label: '粘贴',
      role: 'paste',
    }
    ]);


    InputMenu.popup();

  });
});
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
