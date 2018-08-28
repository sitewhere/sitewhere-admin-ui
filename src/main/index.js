import { app } from "electron";
import { initSplashScreen } from "@trodi/electron-splashscreen";
import path from "path";
import { format as formatURL } from "url";

const isDevelopment = process.env.NODE_ENV !== "production";

app.on("ready", () => {
  // Main window options.
  let windowOptions = {
    width: 1440,
    minWidth: 1024,
    height: 900,
    minHeight: 768,
    title: "SiteWhere Admininstration (Community Edition)",
    titleBarStyle: "hidden",
    webPreferences: {
      webSecurity: false
    }
  };

  // Create splash screen.
  let window = initSplashScreen({
    windowOpts: windowOptions,
    templateUrl: path.join(__static, "/icon.svg"),
    delay: 0,
    minVisible: 2000,
    splashScreenOpts: {
      height: 350,
      width: 350,
      transparent: true,
      webPreferences: {
        webSecurity: false
      }
    }
  });

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatURL({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
      })
    );
  }
});

app.on("window-all-closed", () => {
  app.quit();
});
