const { getAll, buyCart } = require("../controllers/purcharse.controllers");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT");

const purcharsesRouter = express.Router();

purcharsesRouter.route("/").get(verifyJWT, getAll).post(verifyJWT, buyCart);

module.exports = purcharsesRouter;
