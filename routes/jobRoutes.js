const express = require("express");
const router = express.Router();
const db = require("../models");
const helpers = require("../helpers/jobs");

router
    .route("/")
    .get(helpers.getJobs)
    .post(helpers.createJob);

router
    .route("/:jobId")
    .get(helpers.getJob)
    .put(helpers.updateJob)
    .delete(helpers.deleteJob);

module.exports = router;
