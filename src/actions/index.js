const buyerActions = require("./buyer");
const purchaseActions = require("./purchase");
const appActions = require("./app");

const actions = {};
Object.keys(appActions).forEach(key => {
    actions[key] = appActions[key];
});
Object.keys(buyerActions).forEach(key => {
    actions[key] = buyerActions[key];
});
Object.keys(purchaseActions).forEach(key => {
    actions[key] = purchaseActions[key];
});
module.exports = actions;
//module.exports = { ...appActions, ...buyerActions, ...purchaseActions };
