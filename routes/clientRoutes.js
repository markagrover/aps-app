const express = require("express");
const router = express.Router();
const db = require("../models");
const helpers = require("../helpers/clients");

router
    .route("/")
    .get(helpers.getClients)
    .post(helpers.createClient);

router
    .route("/:clientId")
    .get(helpers.getClient)
    .put(helpers.updateClient)
    .delete(helpers.deleteClient);

module.exports = router;
