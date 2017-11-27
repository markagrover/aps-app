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
        //find vendor
        if (err) console.error(err);

        vendor.jobs.push(job);

        vendor.save(function(err, updatedVendor) {
          if (err) console.error(err);

          db.Client.findById(req.params.clientId, function(err, client) {
            if (err) console.error(err);

            client.jobs.push(job);
            job.client = client;

            job.save(function(err, job) {
              if (err) console.error(err);

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

exports.getJob = function(req, res) {
  db.Job
    .findById(req.params.jobId)
    .then(function(job) {
        console.log("THIS IS JOB",job);
      res.json(job);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.updateJob = function(req, res) {
  // new true returns updated record
    console.log('body',req.body);
  let updatedAddressValues;
  const jobKeys = Reflect.ownKeys(req.body);
  const updatedValues = jobKeys.reduce((accu, currentKey) =>{
      if(req.body[currentKey] /*|| typeof req.body[currentKey] === 'Object'*/){
          accu[currentKey] = req.body[currentKey];
      }
      return accu;
    },{});
    console.log('updatedValues',updatedValues);
  if(updatedValues.address){
console.log('updatedValues.address',updatedValues.address);
      const addressKeys = Reflect.ownKeys(updatedValues.address);
      updatedAddressValues = addressKeys.reduce((accu, currentKey) => {
          if(updatedValues.address[currentKey]){
              accu[currentKey] = updatedValues.address[currentKey];
          }
          return accu;
      },{});
      delete updatedValues.address;// remove key from object
  }
  console.log("ID-->",req.params.jobId);
  db.Job.findOne({_id: req.params.jobId}, function(err, job){
      if(err){
          console.error(err);
      } else {
          if(updatedValues/*could be null if all we passed was address data*/){
              const keys = Reflect.ownKeys(updatedValues);
              keys.forEach(key => {
                  if(updatedValues[key]){
                      job[key] = updatedValues[key];
                  }
              });
              console.log('JOB',job,"VALS",updatedValues);
              // job = Object.assign(job, updatedValues); not good
          }

          if(updatedAddressValues){
              job.address = Object.assign(job.address, updatedAddressValues);
          }
          job.save(function(err, updatedJob ){
              if(err){
                  console.error(err);
              } else {
                  res.json(updatedJob);
              }
          })
      }
  })
};

exports.deleteJob = function(req, res) {
  const id = req.params.jobId;
  db.Job.findOne({ _id: id }, function(err, job) {// find job
    if (err) console.error(err);

    db.Vendor.findOneAndUpdate(// find parent vendor and update record
      { jobs: { $in: [id] } },
      { $pull: { jobs: id } },
      function(err, unaffectedRecord) {
        if (err) console.error(err);
        console.log("UnAffected Record:", unaffectedRecord);

        db.Client.findOneAndUpdate(// find parent client and update record
          { jobs: { $in: [id] } },
          { $pull: { jobs: id } },
          function(err, unaffectedRecord) {
            if (err) console.error(err);
            console.log("UnAffected Record:", unaffectedRecord);

            job.remove(function(err) {// remove job record
              if (err) {
                console.error(err);
              } else {
                console.log("Deleted and Records Updated! Yay!");

                db.Job.find(function(err, jobs) {// find all jobs and return them
                  if (err) console.error(err);
                  res.json(jobs);
                });
              }
            });
          }
        );
      }
    );
  });
};

module.exports = exports;
