class Buyer {
  constructor(args) {
    const { name = null, phone = null, dateCreated = null } = typeof args === "object" ? args : {};
    this.name = name; // string
    this.phone = phone; // string
    this.phone = phone; // string
    this.dateCreated = dateCreated; // string
  }
}

module.exports = {
  Buyer,
  name: "buyers"
};
