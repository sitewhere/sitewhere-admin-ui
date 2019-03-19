const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");
const { GoogleAnalytics } = require("../renderer/libraries/google-analytics");
const { Settings } = require("../renderer/libraries/user-settings");

let updater;
autoUpdater.autoDownload = false;
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App starting...");

autoUpdater.on("error", error => {
  dialog.showErrorBox(
    "Error: ",
    error == null ? "unknown" : (error.stack || error).toString()
  );
});

autoUpdater.on("update-available", () => {
  dialog.showMessageBox(
    {
      type: "info",
      title: "Found Updates",
      message: "Found updates, do you want update now?",
      buttons: ["Sure", "No"]
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();
      } else {
        updater.enabled = true;
        updater = null;
      }
    }
  );
});

autoUpdater.on("update-not-available", () => {
  // dialog.showMessageBox({
  //   title: "No Updates",
  //   message: "Current version is up-to-date."
  // });
  if (updater) {
    updater.enabled = true;
    updater = null;
  }
});

autoUpdater.on("update-downloaded", () => {
  dialog.showMessageBox(
    {
      title: "Install Updates",
      message: "Updates downloaded, application will be quit for update..."
    },
    () => {
      let settings = Settings.load();
      GoogleAnalytics.sendApplicationUpdateEvent(settings);
      setImmediate(() => autoUpdater.quitAndInstall());
    }
  );
});

// export this to MenuItem click callback
function checkForUpdates(menuItem, focusedWindow, event) {
  log.info("Checking for updates...");
  if (updater) {
    updater = menuItem;
    updater.enabled = false;
  }
  autoUpdater.checkForUpdates();
}
module.exports.checkForUpdates = checkForUpdates;
