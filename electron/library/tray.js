const { Tray, Menu, app } = require('electron');
const { Utils } = require('ee-core')
const path = require('path');

/* 托盘 */

module.exports = {
  install(eeApp) {
    eeApp.logger.info('[preload] load tray module');
    const trayConfig = eeApp.config.tray;
    const mainWindow = eeApp.electron.mainWindow;

    let iconPath = path.join(Utils.getExtraResourcesDir(),'icon.ico');

    // 托盘菜单功能列表
    let trayMenuTemplate = [
      {
        label: `v_${app.getVersion()}`,
        enabled: true,
      },
      {
        label: '退出',
        click: function () {
          eeApp.appQuit();
        },
      },
    ];

    // 点击关闭，最小化到托盘
    mainWindow.on('close', (event) => {
      if (eeApp.electron.extra.closeWindow == true) {
        return;
      }
      mainWindow.hide();
      //mainWindow.setSkipTaskbar(true);
      event.preventDefault();
    });

    eeApp.electron.tray = new Tray(iconPath);
    let appTray = eeApp.electron.tray;

    appTray.setToolTip(trayConfig.title); // 托盘标题
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    appTray.setContextMenu(contextMenu);

    // 监听 显示/隐藏
    appTray.on('click', function () {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    });
  },
};
