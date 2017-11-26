const express = require("express");
const router = express.Router();
const db = require("../models");
const helpers = require("../helpers/vendors");
const jobHelpers = require("../helpers/jobs");

router
    .route("/")
    .get(helpers.getVendors)
    .post(helpers.createVendor);
router
    .route("/edit/:vendorId")
    .get(helpers.getVendorOnly)
    .put(helpers.updateVendor)
    // .delete(helpers.deleteVendor);
router
    .route("/:vendorId")
    .get(helpers.getVendor)
    .put(helpers.updateVendor)
    .delete(helpers.deleteVendor);
router
    .route("/:vendorId/clients/:clientId/jobs")
    .post(jobHelpers.createJob)
    .get(helpers.getVendor)
    .put(helpers.updateVendor)
    .delete(helpers.deleteVendor);

module.exports = router;
