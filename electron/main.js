const { app, BrowserWindow, ipcMain, nativeImage, Tray, Menu, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let tray;
let isQuitting = false;

function createTrayIcon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="8" fill="#6c5ce7"/>
      <rect x="6" y="7" width="8" height="18" rx="2" fill="#fff" opacity=".95"/>
      <rect x="17" y="7" width="9" height="8" rx="2" fill="#ffd166"/>
      <rect x="17" y="18" width="9" height="7" rx="2" fill="#7ce3b1"/>
    </svg>`;
  return nativeImage.createFromDataURL(`data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1220,
    height: 780,
    minWidth: 420,
    minHeight: 520,
    backgroundColor: '#f4f1eb',
    icon: createTrayIcon(),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'src', 'index.html'));
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  tray = new Tray(createTrayIcon());
  tray.setToolTip('Kanban Stickers');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Открыть Kanban Stickers', click: () => mainWindow.show() },
    { type: 'separator' },
    { label: 'Выход', click: () => { isQuitting = true; app.quit(); } }
  ]));
  tray.on('double-click', () => mainWindow.show());
}

app.whenReady().then(() => {
  ipcMain.handle('window:set-always-on-top', (_event, value) => {
    mainWindow.setAlwaysOnTop(Boolean(value), 'floating');
    return mainWindow.isAlwaysOnTop();
  });

  ipcMain.handle('window:get-always-on-top', () => mainWindow.isAlwaysOnTop());

  ipcMain.handle('app:set-login-item', (_event, enabled) => {
    app.setLoginItemSettings({ openAtLogin: Boolean(enabled) });
    return app.getLoginItemSettings().openAtLogin;
  });

  ipcMain.handle('app:get-login-item', () => app.getLoginItemSettings().openAtLogin);

  ipcMain.handle('data:export', async (_event, json) => {
    const result = await dialog.showSaveDialog(mainWindow, {
      title: 'Экспорт Kanban Stickers',
      defaultPath: `kanban-stickers-${new Date().toISOString().slice(0, 10)}.json`,
      filters: [{ name: 'Kanban backup', extensions: ['json'] }]
    });
    if (result.canceled || !result.filePath) return false;
    fs.writeFileSync(result.filePath, json, 'utf8');
    return true;
  });

  ipcMain.handle('data:import', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Импорт Kanban Stickers',
      properties: ['openFile'],
      filters: [{ name: 'Kanban backup', extensions: ['json'] }]
    });
    if (result.canceled || !result.filePaths[0]) return null;
    return fs.readFileSync(result.filePaths[0], 'utf8');
  });

  ipcMain.handle('data:export-project', async (_event, { xml, boardName }) => {
    const safeName = String(boardName || 'kanban-project').replace(/[<>:"/\\|?*]/g, '-');
    const result = await dialog.showSaveDialog(mainWindow, {
      title: 'Export to Microsoft Project',
      defaultPath: `${safeName}.xml`,
      filters: [{ name: 'Microsoft Project XML', extensions: ['xml'] }]
    });
    if (result.canceled || !result.filePath) return false;
    fs.writeFileSync(result.filePath, xml, 'utf8');
    return true;
  });

  createWindow();
  app.on('activate', () => mainWindow?.show());
});

app.on('before-quit', () => { isQuitting = true; });
app.on('window-all-closed', (event) => event.preventDefault());
