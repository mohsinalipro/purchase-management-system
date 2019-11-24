const BrowserWindow = require("electron").BrowserWindow;
const fs = require('fs');
const path = require('path');
const getGlobalCSS = require('../common/getGlobalCSS');
const setWindowTitle = (req, res) => {
  const { payload } = req;
  let focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.setTitle(payload.title);
  res.send({ status: true });
};

const printRawHtml = (req, res) => {
  const content = req.payload;
  // fs.writeFileSync(path.resolve(__dirname + '/../../public/print.html'),content)
 
 const focusedWindow = BrowserWindow.getFocusedWindow();
  const win = new BrowserWindow({
    width: 1366,
    height: 768, show: true, parent: focusedWindow });

  win.loadURL(
    `data:text/html;charset=UTF-8,${encodeURIComponent(
      content
    )}`
  );
  win.webContents.on("did-finish-load", () => {
    console.log('did-finish-load');
    // const printPageStylePath = path.resolve(__dirname + '/../components/print-page/style.css');

    // console.log(printPageStylePath)
    // const styles = fs.readFileSync(printPageStylePath)
    // console.log(styles);
    win.webContents.insertCSS(getGlobalCSS());
    win.webContents.executeJavaScript(
      "window.print(); setTimeout(() => window.close());"
      // "setTimeout(() => {window.print(); setTimeout(() => window.close()),100}, 1000)" 
      );
    res.send({ status: true });
  });
  

};

module.exports = { setWindowTitle, printRawHtml };
