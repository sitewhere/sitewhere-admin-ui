'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import IsDev from "electron-is-dev";

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { autoUpdater } = require("electron-updater");

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null

// Regsiter "app" as a privileged scheme.
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

/**
 * Create splash screen, then browser window.
 */
function createWindow() {
  const version = !IsDev ? app.getVersion() : "3.0.0";

  // Main window options.
  const windowOptions: Electron.BrowserWindowConstructorOptions = {
    width: 1440,
    minWidth: 1024,
    height: 900,
    minHeight: 768,
    backgroundColor: '#ffffff',
    title: `SiteWhere Admininstration (${version} CE)`,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
    show: false
  };

  // Create browser window.
  const window = new BrowserWindow(windowOptions);

  // Load correct URL based on whether in dev mode.
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) window.webContents.openDevTools()
  } else {
    createProtocol('app')
    window.loadURL('app://./index.html')
  }

  // Check for updates.
  autoUpdater.checkForUpdatesAndNotify();

  // Only show after browser content rendered.
  window.once('ready-to-show', () => {
    window.show()
  })

  // Handle window closed.
  window.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

/**
 * Wait for Electron to be ready, then create window.
 */
app.on('ready', async () => {
  createWindow()
})

/**
 * Exit cleanly on request from parent process in development mode.
 */
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
