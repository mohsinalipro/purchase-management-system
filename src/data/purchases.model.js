module.exports = class Purchase {
  constructor(args) {
    const {
      date = null,
      truckNo = null,
      receiptNo = null,
      quality = null,
      cubicFeet = null,
      rate = null,
      amount = null,
      buyerId = null
    } = typeof args === "object" ? args : {};
    this.id = null; // string
    this.date = date; // date
    this.truckNo = truckNo; // string
    this.receiptNo = receiptNo; // string
    this.quality = quality; // string
    this.cubicFeet = cubicFeet; //string
    this.rate = rate; // string
    this.amount = amount; // string

    this.buyerId = buyerId; // Buyer.id
  }
};

module.exports.name = "Purchases";
