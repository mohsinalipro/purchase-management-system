const BrowserWindow = require("electron").BrowserWindow;

const setWindowTitle = (req, res) => {
  const { payload } = req;
  let focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.setTitle(payload.title);
  res.send({ status: true });
};

const printRawHtml = (req, res) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  const win = new BrowserWindow({
    width: 1366,
    height: 768, show: true, parent: focusedWindow });

  win.loadURL(
    `data:text/html;charset=UTF-8,${encodeURIComponent(
      `<html>${req.payload.html}</html>`
    )}`
  );
  win.webContents.on("did-finish-load", () => {
    win.webContents.insertCSS(req.payload.styles);
    win.webContents.executeJavaScript(
      "window.print(); setTimeout(() => window.close());"
      // "setTimeout(() => {window.print(); setTimeout(() => window.close()),100}, 1000)" 
      );
    res.send({ status: true });
  });
};

module.exports = { setWindowTitle, printRawHtml };
