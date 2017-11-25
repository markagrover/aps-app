const mongoose = require("mongoose");
const db = require("../models");

exports.getVendors = function(req, res) {
  db.Vendor
    .find()
    .then(function(vendors) {
      console.log("VENDORS=>", vendors);
      res.json(vendors);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.createVendor = function(req, res) {
  db.Vendor
    .create(req.body)
    .then(function(newVendor) {
      db.Vendor.find().then(function(vendors) {
        res.send(vendors);
      });
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.getVendor = function(req, res) {
  let response = {};
  db.Vendor.findOne({ _id: req.params.vendorId }, function(err, vendor) {
    if (err) console.err(err);
    response.vendor = vendor;
    db.Client.find({ vendor: req.params.vendorId }, function(err, clients) {
      if (err) console.error(err);
      response.clients = clients;
      res.json(response);
    });
  });
};

exports.getVendorOnly = function(req, res) {
  db.Vendor.findOne({ _id: req.params.vendorId }, function(err, vendor) {
    if (err) console.err(err);
    console.log("VENDOR=>", vendor);
    res.json(vendor);
  });
};

exports.updateVendor = function(req, res) {
  // new true returns updated record
  db.Vendor
    .findOneAndUpdate({ _id: req.params.vendorId }, req.body, { new: true })
    .then(function(vendor) {
      res.json(vendor);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.deleteVendor = function(req, res) {
  db.Vendor
    .remove({ _id: req.body })
    .then(function() {
      res.json({ message: "We Deleted It!" });
    })
    .catch(function(err) {
      res.send(err);
    });
};

// create job and update client and vendor with new job.
exports.createJob = function(req, res) {
  db.Job
    .create(req.body.job, function(err, job) {


      db.Vendor.findById(req.params.vendorId, function(err, vendor) {
        vendor.jobs.push(job);
        vendor.save(function(err, updatedVendor) {
          if (err) console.error(err);
          db.Client.findById(req.params.clientId, function(err, client) {
            if (err) console.error(err);
            client.jobs.push(job);
            job.client = client;
            job.save(function(err, job){
                if(err) console.error(err);
                console.log("Job Saved", job);
            });
            client.save(function(err, updatedClient) {
              if (err) console.error(err);
              res.json({ message: "We created job It!" });
            });
          });
        });
      });
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports = exports;
