'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { initSplashScreen } from "@trodi/electron-splashscreen";
import IsDev from "electron-is-dev";
import path from "path";

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { autoUpdater } = require("electron-updater");

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

/** Placeholder for static asset base */
const __static = '';

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
    title: `SiteWhere Admininstration (${version} CE)`,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  };

  // Create splash screen.
  const window = initSplashScreen({
    windowOpts: windowOptions,
    templateUrl: path.join(__static, "/icon.svg"),
    delay: 0,
    minVisible: 1000,
    splashScreenOpts: {
      height: 350,
      width: 350,
      transparent: true,
      webPreferences: {
        webSecurity: false
      }
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) window.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    window.loadURL('app://./index.html')
  }

  // Check for updates.
  autoUpdater.checkForUpdatesAndNotify();

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
