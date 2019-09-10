module.exports = class Buyer {
  constructor(args) {
    const { name = null, phone = null } = typeof args === "object" ? args : {};
    this.id = null; // string
    this.name = name; // string
    this.phone = phone; // string
  }
};
module.exports.name = "Buyers";
