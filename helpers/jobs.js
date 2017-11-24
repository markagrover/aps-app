const db = require("../models");

exports.getJobs = function(req, res) {
    db.Jobs
        .find()
        .then(function(jobs) {
            res.json(jobs);
        })
        .catch(function(err) {
            res.send(err);
        });
};

exports.createJob = function(req, res) {
    const isNote = req.body.note;
    let job;
    let note;
    db.Job
        .create(req.body.job)
        .then(function(newJob) {
            job = newJob;
        })
        .catch(function(err) {
            res.send(err);
        });
    if(isNote){
        db.Note
            .create(req.body.note)
            .then(function(newNote){
                job.notes.push(newNote);
                job.save();
            }).catch(function(err){
                res.send(err);
        })
    }


};

exports.getJob = function(req, res) {
    db.Job
        .findById(req.body)
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
