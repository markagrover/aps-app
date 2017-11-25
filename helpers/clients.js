const db = require("../models");

exports.getClients = function(req, res) {
    // todo create a record obj to claer up bugs on key / data assignment
    db.Client
        .find()
        .populate('jobs')
        .exec(function(err, clients) {
            if(err) console.error(err);
            res.json(clients);
        })

};

exports.createClient = function(req, res) {
    db.Client
        .create(req.body, function(err, client) {
            console.log("CLIENT",client);
            if(err) console.error(err);
            if(req.body.vendor){
                db.Vendor
                    .findOne({_id: req.body.vendor}, function(err, vendor){
                    console.log('vendor',vendor);
                        if(err) console.error(err);
                        vendor.clients.push(client);
                        vendor.save(function(err, vendor){
                            if(err) console.error(err);

                        });
                    });
            }
            db.Client
                .find()
                .populate('jobs')
                .exec(function(clients){
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
        .populate('jobs')
        .exec(function(err, client) {
            if(err) console.error(err);
            res.json(client);
        })
        .catch(function(err){
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
