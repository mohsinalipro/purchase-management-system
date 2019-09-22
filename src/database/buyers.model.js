class Buyer {
  constructor(args) {
    const { name = null, phone = null } = typeof args === "object" ? args : {};
    this.name = name; // string
    this.phone = phone; // string
  }
}

module.exports = {
  Buyer,
  name: "buyers"
};
