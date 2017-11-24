const mongoose = require('mongoose');
const db = require("../models");

exports.getVendors = function(req, res) {
    db.Vendor
        .find()
        .then(function(vendors) {
            console.log("VENDORS=>",vendors);
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
            db.Vendor
                .find()
                .then(function(vendors){
                    res.send(vendors);
                })
        })
        .catch(function(err) {
            res.send(err);
        });
};

exports.getVendor = function(req, res) {
    let response = {};
    db.Vendor.findOne({'_id': req.params.vendorId},function(err, vendor){
        if(err) console.err(err);
        console.log("VENDOR=>",vendor);
        response.vendor = vendor;
        db.Client.find({'vendor': req.params.vendorId}, function(err, clients){
            if(err)console.error(err);
            response.clients = clients;
            res.json(response);
        });

    })



};

exports.getVendorOnly = function(req, res) {
    db.Vendor.findOne({'_id': req.params.vendorId},function(err, vendor){
        if(err) console.err(err);
        console.log("VENDOR=>",vendor);
            res.json(vendor);
        });
};

exports.updateVendor = function(req, res) {
    // new true returns updated record
    db.Vendor
        .findOneAndUpdate({ '_id': req.params.vendorId }, req.body, { new: true })
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

module.exports = exports;
