const db = require("../models");

exports.getClients = function(req, res) {
  // todo create a record obj to claer up bugs on key / data assignment
  db.Client
    .find()
    .populate("jobs")
    .exec(function(err, clients) {
      if (err) console.error(err);
      res.json(clients);
    });
};

exports.createClient = function(req, res) {
  db.Client
    .create(req.body, function(err, client) {
      if (err) console.error(err);
      if (req.body.vendor) {
        db.Vendor.findOne({ _id: req.body.vendor }, function(err, vendor) {
          if (err) console.error(err);
          vendor.clients.push(client);
          vendor.save(function(err, vendor) {
            if (err) console.error(err);
          });
        });
      }
      db.Client
        .find()
        .populate("jobs")
        .exec(function(clients) {
          res.send(clients);
        });
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.getClient = function(req, res) {
  db.Client
    .findById(req.params.clientId)
    .populate("jobs")
    .exec(function(err, client) {
      if (err) console.error(err);
      res.json(client);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.updateClient = function(req, res) {
  // new true returns updated record
  let updatedAddressValues;
  const clientKeys = Reflect.ownKeys(req.body);
  const updatedValues = clientKeys.reduce((accu, currentKey) => {
    if (req.body[currentKey] /*|| typeof req.body[currentKey] === 'Object'*/) {
      accu[currentKey] = req.body[currentKey];
    }
    return accu;
  }, {});
  if (updatedValues.address) {
    const addressKeys = Reflect.ownKeys(updatedValues.address);
    updatedAddressValues = addressKeys.reduce((accu, currentKey) => {
      if (updatedValues.address[currentKey]) {
        accu[currentKey] = updatedValues.address[currentKey];
      }
      return accu;
    }, {});
    delete updatedValues.address; // remove key from object
  }
  db.Client.findOne({ _id: req.params.clientId }, function(err, client) {
    if (err) {
      console.error(err);
    } else {
      if (updatedValues /*could be null if all we passed was address data*/) {
        client = Object.assign(client, updatedValues);
      }
      if (updatedAddressValues) {
        client.address = Object.assign(client.address, updatedAddressValues);
      }
      client.save(function(err, updatedClient) {
        if (err) {
          console.error(err);
        } else {
          res.json(updatedClient);
        }
      });
    }
  });
};

exports.deleteClient = function(req, res) {
  db.Client
    .remove({ _id: req.params.clientId }, function(err, response) {
      if (err) {
        console.error(err);
      } else {
        db.Vendor.findOneAndUpdate(
          { clients: { $in: [req.params.clientId] } },
          { $pull: { clients: req.params.clientId } },
          function(err, unchangedRecord) {
            if (err) {
              console.error(err);
            } else {
              db.Client.find().then(function(err, records) {
                console.log("WE DELETED IT!, Yay!");
                res.json(records);
              });
            }
          }
        );
      }
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports = exports;
