const { app, BrowserWindow, screen } = require('electron');

app.commandLine.appendSwitch('disable-gpu');

app.whenReady().then(async () => {
  const window = new BrowserWindow({ show: false, width: 900, height: 600, minWidth: 420, minHeight: 520 });
  window.setAlwaysOnTop(true, 'normal');
  window.maximize();
  await new Promise((resolve) => setTimeout(resolve, 250));

  const contentBounds = window.getContentBounds();
  const workArea = screen.getDisplayMatching(window.getBounds()).workArea;
  const contentBottom = contentBounds.y + contentBounds.height;
  const workAreaBottom = workArea.y + workArea.height;
  if (contentBottom > workAreaBottom + 1) throw new Error(`Maximized content overlaps the Windows taskbar: ${contentBottom} > ${workAreaBottom}`);

  console.log('WINDOW_BOUNDS_OK');
  window.destroy();
  app.quit();
}).catch((error) => {
  console.error(error.stack || error);
  app.exit(1);
});
