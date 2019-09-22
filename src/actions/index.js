const buyerActions = require("./buyer");
const purchaseActions = require("./purchase");
const appActions = require("./app");

module.exports = { ...appActions, ...buyerActions, ...purchaseActions };
