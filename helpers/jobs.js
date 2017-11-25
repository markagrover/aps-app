const db = require("../models");

exports.getJobs = function(req, res) {
    db.Job
        .find()
        .then(function(jobs) {
            res.json(jobs);
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

// exports.createJob = function(req, res) {
//     const isNote = req.body.note;
//     const owner = req.body.clientId;
//
//     let job;
//     let note;
//     console.log('req.body.job',req.body.job);
//     db.Job
//         .create(req.body.job,function(err, newJob){
//             if(err) console.error(err);
//             newJob.address = req.body.job.address;
//             newJob.save(function(err, newJob){
//                 job = newJob;
//             })
//         })
//         .catch(function(err) {
//             res.send(err);
//         });
//     if(isNote){
//         db.Note
//             .create(req.body.note)
//             .then(function(newNote){
//                 job.notes.push(newNote);
//                 job.save();
//             }).catch(function(err){
//                 res.send(err);
//         })
//     }
//
//
// };

exports.getJob = function(req, res) {
    db.Job
        .findById(req.params.jobId)
        .then(function(job) {
            res.json(job);
        })
        .catch(function(err) {
            res.send(err);
        });
};

exports.updateJob = function(req, res) {
    // new true returns updated record

    db.Job
        .findOneAndUpdate({ _id: req.params.jobId }, req.body, { new: true })
        .then(function(job) {
            res.json(job);
        })
        .catch(function(err) {
            res.send(err);
        });
};

exports.deleteJob = function(req, res) {

    db.Job
        .remove({ _id: req.body })
        .then(function() {
            res.json({ message: "We Deleted It!" });
        })
        .catch(function(err) {
            res.send(err);
        });
};

module.exports = exports;
