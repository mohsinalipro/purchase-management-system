const Datastore = require("nedb");

const path = require("path");
const fs = require("fs");

const { name: BUYERS_DB_NAME } = require("./buyers.model");
const { name: PURCHASES_DB_NAME } = require("./purchases.model");

class AppDatabase {
  constructor() {
    this.DB_FILE_PATH = path.join(__dirname, "/datafiles");

    if (!fs.existsSync(this.DB_FILE_PATH)) {
      fs.mkdirSync(this.DB_FILE_PATH);
    }
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
    console.log(DB_NAME);
    return path.join(this.DB_FILE_PATH, "/" + DB_NAME);
  }
}
const dbInstance = new AppDatabase();
module.exports = () => dbInstance;
