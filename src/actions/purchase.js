const dbInstance = require("../database")();

const { name: PURCHASES_DB_NAME } = require("../database/purchases.model");

// eiphop
const addPurchase = (req, res) => {
  const { payload } = req;
  dbInstance.datastores[PURCHASES_DB_NAME].insert(payload, function(
    err,
    newDoc
  ) {
    if (err) {
      return res.error({ status: false, error: error });
    }
    res.send({ status: true, data: newDoc });
  });
};
const updatePurchase = (req, res) => {
  const { payload } = req;
  const { _id, ...fields } = payload;
  dbInstance.datastores[PURCHASES_DB_NAME].update(
    { _id: _id },
    { ...fields },
    function(err, newDoc) {
      if (err) {
        return res.error({ status: false, error: error });
      }
      res.send({ status: true, data: newDoc });
    }
  );
};

const deletePurchase = (req, res) => {
  const { payload } = req;
  const { _id } = payload;
  dbInstance.datastores[PURCHASES_DB_NAME].remove({ _id: _id }, function(
    err,
    newDoc
  ) {
    if (err) {
      return res.error({ status: false, error: error });
    }
    res.send({ status: true, data: newDoc });
  });
};

const getPurchasesByBuyerId = (req, res) => {
  const { payload } = req;
  dbInstance.datastores[PURCHASES_DB_NAME].find({ buyer_id: payload }, function(
    err,
    docs
  ) {
    if (err) {
      return res.error({ status: false, error: error });
    }
    res.send({ status: true, data: docs });
  });
};

const getPurchaseCount = (req, res) => {
  // const { payload } = req;
  dbInstance.datastores[PURCHASES_DB_NAME].count({}, function(err, count) {
    if (err) {
      return res.error({ status: false, error: error });
    }
    res.send({ status: true, data: count });
  });
};
// const hip = async (req, res) => {
//   const { payload } = req;
//   await new Promise(done => setTimeout(done, 800));
//   res.send({ msg: "hop" });

//   // or res.error({msg: 'failed'})
// };

module.exports = {
  addPurchase,
  getPurchasesByBuyerId,
  getPurchaseCount,
  updatePurchase,
  deletePurchase
};
