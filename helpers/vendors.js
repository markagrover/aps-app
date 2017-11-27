const mongoose = require("mongoose");
const db = require("../models");

exports.getVendors = function(req, res) {
  db.Vendor
    .find()
    .populate({
        path: 'clients',
        populate: {path: 'jobs'}
    })
    .populate('jobs')
    .exec(function(err, vendors) {
      if(err) console.error(err);
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
  db.Vendor
      .findOne({ _id: req.params.vendorId })
      .populate('jobs')
      .populate({
          path: 'clients',
          populate: {path: 'jobs'}
      })
      .exec(function(err, vendor){
        if(err) console.error(err);
        response.vendor = vendor;
      })
      .then(function(){
          db.Client
              .find({ vendor: req.params.vendorId })
              .populate('jobs')
              .exec(function(err, clients){
                  if(err) console.error(err);
                  response.clients = clients;
                  res.json(response);
              })
      })
      .catch(function(err){
        console.error(err);
      });
};

exports.getVendorOnly = function(req, res) {
    db.Vendor
        .findOne({ _id: req.params.vendorId })
        .populate('jobs')
        .populate('clients')
        .populate({
            path: 'clients',
            populate: {path: 'jobs'}
        })
        .exec(function(err, vendor){
            if(err) console.error(err);
            res.json(vendor);
        })
        .catch(function(err){
          console.error(err);
        })
};

exports.updateVendor = function(req, res) {
    console.log("WORKING...",req.body);
    let updatedAddressValues;
    const keys = Reflect.ownKeys(req.body);
    const updateValues = keys.reduce((accu, current) => {// build up an object of the data
        if(req.body[current]){
            accu[current] = req.body[current];
        }
        return accu;
    },{});

    if(updateValues.address){// check to see if the nested data is present
        const addressKeys = Reflect.ownKeys(updateValues.address);
        updatedAddressValues = addressKeys.reduce((accu, currentKey) => {
            if(updateValues.address[currentKey]){
                accu[currentKey] = updateValues.address[currentKey];
            }
            return accu;
        },{});
       delete updateValues.address;// remove key from object
    }


    db.Vendor.findOne({_id: req.params.vendorId}, function(err, vendor){// find Document
        if(err){
            console.error(err);
        } else {
            const keys = Reflect.ownKeys(updateValues);// set data on object
            keys.forEach((key) => {
                vendor[key] = updateValues[key];
            });
            //vendor = Object.assign(vendor, updateValues); Bad Here , Think about it. DIF Library

            if(updatedAddressValues){
                const addressKeys = Reflect.ownKeys(updatedAddressValues);// set data on object

                vendor.address = Object.assign(vendor.address, updatedAddressValues);// see I proved it!
            }
            vendor.save(function(err, updatedRecord){// save record
                if(err){
                    console.error(err);
                } else {
                    res.json(updatedRecord);
                }
            })

        }
    });
};

exports.deleteVendor = function(req, res) {
  db.Vendor
    .remove({ _id: req.params.vendorId })
    .then(function() {
      res.json({ message: "We Deleted It!" });
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports = exports;
