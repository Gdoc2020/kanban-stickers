const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktop', {
  setAlwaysOnTop: (value) => ipcRenderer.invoke('window:set-always-on-top', value),
  getAlwaysOnTop: () => ipcRenderer.invoke('window:get-always-on-top'),
  setLoginItem: (value) => ipcRenderer.invoke('app:set-login-item', value),
  getLoginItem: () => ipcRenderer.invoke('app:get-login-item'),
  loadAutoData: () => ipcRenderer.invoke('data:load-auto'),
  autoSaveData: (json) => ipcRenderer.invoke('data:auto-save', json),
  saveData: (json) => ipcRenderer.invoke('data:save', json),
  saveDataAs: (json) => ipcRenderer.invoke('data:save-as', json),
  exportData: (json) => ipcRenderer.invoke('data:export', json),
  importData: () => ipcRenderer.invoke('data:import'),
  exportProject: (xml, boardName) => ipcRenderer.invoke('data:export-project', { xml, boardName }),
  onMenuCommand: (callback) => ipcRenderer.on('menu:command', (_event, command) => callback(command))
});
