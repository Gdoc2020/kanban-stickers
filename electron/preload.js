const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktop', {
  setAlwaysOnTop: (value) => ipcRenderer.invoke('window:set-always-on-top', value),
  getAlwaysOnTop: () => ipcRenderer.invoke('window:get-always-on-top'),
  setLoginItem: (value) => ipcRenderer.invoke('app:set-login-item', value),
  getLoginItem: () => ipcRenderer.invoke('app:get-login-item'),
  exportData: (json) => ipcRenderer.invoke('data:export', json),
  importData: () => ipcRenderer.invoke('data:import'),
  exportProject: (xml, boardName) => ipcRenderer.invoke('data:export-project', { xml, boardName })
});
