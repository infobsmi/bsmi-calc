import { app, BrowserWindow, remote, Menu } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;




const originWidth = 800;
const originHeight = 600;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: originWidth,
    height: originHeight

  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
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
    const InputMenu = Menu.buildFromTemplate([{
      label: '撤销',
      role: 'undo',
    }, {
      label: '重做',
      role: 'redo',
    }, {
      type: 'separator',
    }, {
      label: '剪切',
      role: 'cut',
    }, {
      label: '复制',
      role: 'copy',
    }, {
      label: '粘贴',
      role: 'paste',
    }, {
      type: 'separator',
    }, {
      label: '全选',
      role: 'selectAll',
    },
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
