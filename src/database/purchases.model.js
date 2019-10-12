class Purchase {
  constructor(args) {
    const {
      date = null,
      truckNo = null,
      receiptNo = null,
      quality = null,
      cubicFeet = null,
      rate = null,
      amount = null,
      buyer_id = null
    } = typeof args === "object" ? args : {};
    this.date = date; // date
    this.truckNo = truckNo; // string
    this.receiptNo = receiptNo; // string
    this.quality = quality; // string
    this.cubicFeet = cubicFeet; //string
    this.rate = rate; // string
    this.amount = amount; // string

    this.buyer_id = buyer_id; // Buyer.id
  }
}

module.exports = {
  Purchase,
  name: "purchases"
};
