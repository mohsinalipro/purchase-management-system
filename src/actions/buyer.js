const dbInstance = require("../database")();

const { name: BUYERS_DB_NAME } = require("../database/buyers.model");

// eiphop
const addBuyer = (req, res) => {
  const { payload } = req;
  dbInstance.datastores[BUYERS_DB_NAME].insert(payload, function(err, newDoc) {
    if (err) {
      return res.error({ status: false, error: error });
    }
    res.send({ status: true, data: newDoc });
  });
};

const updateBuyerField = (req, res) => {
  const { payload } = req;
  dbInstance.datastores[BUYERS_DB_NAME].update(
    { _id: payload.buyer_id },
    { $set: { [payload.field]: payload.value } },
    {},
    function(err, numberOfUpdated) {
      if (err) {
        return res.error({ status: false, error: error });
      }
      res.send({ status: true, data: { numberOfUpdated } });
    }
  );
};

const getBuyerById = (req, res) => {
  const { payload } = req;
  dbInstance.datastores[BUYERS_DB_NAME].findOne({ _id: payload }, function(
    err,
    doc
  ) {
    if (err) {
      return res.error({ status: false, error: error });
    }
    res.send({ status: true, data: doc });
  });
};

const getAllBuyers = (req, res) => {
  // const { payload } = req;
  dbInstance.datastores[BUYERS_DB_NAME].find({}, function(err, docs) {
    if (err) {
      return res.error({ status: false, error: error });
    }
    res.send({ status: true, data: docs });
  });
};

const getBuyerCount = (req, res) => {
  // const { payload } = req;
  dbInstance.datastores[BUYERS_DB_NAME].count({}, function(err, count) {
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
  addBuyer,
  getBuyerById,
  getAllBuyers,
  updateBuyerField,
  getBuyerCount
};
