const path = require("path");

const Datastore = require("nedb");

const BUYERS_DB_NAME = require("./buyers.model").name;
const PURCHASES_DB_NAME = require("./purchases.model").name;

module.exports = class AppDatabase {
  constructor() {
    this.DB_PATH = path.join(__dirname, "/db");

    this.datastores = {
      [BUYERS_DB_NAME]: new Datastore({
        filename: this.getDBPath(BUYERS_DB_NAME),
        autoload: true
      }),
      [PURCHASES_DB_NAME]: new Datastore({
        filename: this.getDBPath(PURCHASES_DB_NAME),
        autoload: true
      })
    };
  }

  getDBPath(DB_NAME) {
    return path.join(this.DB_PATH, "/" + DB_NAME);
  }
};
