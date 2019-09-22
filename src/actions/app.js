const window = require("electron").BrowserWindow;

const setWindowTitle = (req, res) => {
  const { payload } = req;
  let focusedWindow = window.getFocusedWindow();
  focusedWindow.setTitle(payload.title);
  res.send({ status: true });
};

module.exports = { setWindowTitle };
