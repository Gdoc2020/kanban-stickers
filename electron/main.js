const { app, BrowserWindow, ipcMain, nativeImage, Tray, Menu, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { readProjectFile, writeProjectFile } = require('./storage');

let mainWindow;
let tray;
let isQuitting = false;
let currentDocumentPath = null;
let latestProjectJson = null;

const autosavePath = () => path.join(app.getPath('userData'), 'kanban-stickers-autosave.json');

function sendMenuCommand(command) {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('menu:command', command);
}

function createApplicationMenu() {
  return Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { label: 'Save', accelerator: 'CmdOrCtrl+S', click: () => sendMenuCommand('save') },
        { label: 'Save As…', accelerator: 'CmdOrCtrl+Shift+S', click: () => sendMenuCommand('save-as') },
        { type: 'separator' },
        { label: 'Import…', accelerator: 'CmdOrCtrl+O', click: () => sendMenuCommand('import') },
        { label: 'Export backup…', click: () => sendMenuCommand('export') },
        { label: 'Export board to Microsoft Project…', click: () => sendMenuCommand('export-project') },
        { type: 'separator' },
        { label: 'Exit', accelerator: 'Alt+F4', click: () => { isQuitting = true; app.quit(); } }
      ]
    },
    {
      label: 'View',
      submenu: [
        { label: 'Zoom in', accelerator: 'CmdOrCtrl+Plus', click: () => sendMenuCommand('zoom-in') },
        { label: 'Zoom out', accelerator: 'CmdOrCtrl+-', click: () => sendMenuCommand('zoom-out') },
        { label: 'Reset zoom', accelerator: 'CmdOrCtrl+0', click: () => sendMenuCommand('zoom-reset') },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Help',
      submenu: [{ label: 'About Kanban Stickers', click: () => dialog.showMessageBox(mainWindow, { type: 'info', title: 'Kanban Stickers', message: 'Kanban Stickers', detail: 'Made and developed by Technochip\nowned by Grigory Bzhitov' }) }]
    }
  ]);
}

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
  Menu.setApplicationMenu(createApplicationMenu());
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('close', (event) => {
    if (latestProjectJson) writeProjectFile(autosavePath(), latestProjectJson);
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

  ipcMain.handle('data:load-auto', () => {
    try { latestProjectJson = readProjectFile(autosavePath()); }
    catch (_) { latestProjectJson = null; }
    return latestProjectJson;
  });

  ipcMain.handle('data:auto-save', (_event, json) => {
    latestProjectJson = json;
    writeProjectFile(autosavePath(), json);
    return true;
  });

  ipcMain.handle('data:save', (_event, json) => {
    latestProjectJson = json;
    writeProjectFile(autosavePath(), json);
    if (currentDocumentPath) writeProjectFile(currentDocumentPath, json);
    return { ok: true, filePath: currentDocumentPath || autosavePath() };
  });

  ipcMain.handle('data:save-as', async (_event, json) => {
    const result = await dialog.showSaveDialog(mainWindow, {
      title: 'Save Kanban Stickers project as',
      defaultPath: `${new Date().toISOString().slice(0, 10)}-kanban-stickers.json`,
      filters: [{ name: 'Kanban Stickers project', extensions: ['json'] }]
    });
    if (result.canceled || !result.filePath) return { ok: false };
    currentDocumentPath = result.filePath;
    latestProjectJson = json;
    writeProjectFile(autosavePath(), json);
    writeProjectFile(currentDocumentPath, json);
    return { ok: true, filePath: currentDocumentPath };
  });

  ipcMain.handle('data:export', async (_event, json) => {
    const result = await dialog.showSaveDialog(mainWindow, {
      title: 'Экспорт Kanban Stickers',
      defaultPath: `kanban-stickers-${new Date().toISOString().slice(0, 10)}.json`,
      filters: [{ name: 'Kanban backup', extensions: ['json'] }]
    });
    if (result.canceled || !result.filePath) return false;
    writeProjectFile(result.filePath, json);
    return true;
  });

  ipcMain.handle('data:import', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Импорт Kanban Stickers',
      properties: ['openFile'],
      filters: [{ name: 'Kanban backup', extensions: ['json'] }]
    });
    if (result.canceled || !result.filePaths[0]) return null;
    currentDocumentPath = result.filePaths[0];
    latestProjectJson = readProjectFile(currentDocumentPath);
    writeProjectFile(autosavePath(), latestProjectJson);
    return latestProjectJson;
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

app.on('before-quit', () => {
  isQuitting = true;
  if (latestProjectJson) writeProjectFile(autosavePath(), latestProjectJson);
});
app.on('window-all-closed', (event) => event.preventDefault());
