const db = require("../models");

exports.getClients = function(req, res) {
    // todo create a record obj to claer up bugs on key / data assignment
    db.Client
        .find()
        .then(function(clients) {
            res.json(clients);
        })
        .catch(function(err) {
            res.send(err);
        });
};

exports.createClient = function(req, res) {
    db.Client
        .create(req.body)
        .then(function() {
            db.Client
                .find()
                .then(function(clients){
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
        .then(function(todo) {
            res.json(todo);
        })
        .catch(function(err) {
            res.send(err);
        });
};

exports.updateClient = function(req, res) {

    // new true returns updated record
    db.Client
        .findOneAndUpdate({ _id: req.params.clientId }, req.body, { new: true })
        .then(function(todo) {
            res.json(todo);
        })
        .catch(function(err) {
            res.send(err);
        });
};

exports.deleteClient = function(req, res) {
    db.Client
        .remove({ _id: req.params.clientId })
        .then(function() {
            res.json({ message: "We Deleted It!" });
        })
        .catch(function(err) {
            res.send(err);
        });
};

module.exports = exports;
