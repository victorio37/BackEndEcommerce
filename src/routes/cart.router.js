const {
	getAll,
	createCart,
	getOneCart,
	removeCart,
	updateCart,
} = require("../controllers/cart.controllers");
const express = require("express");
const cartRouter = express.Router();
const verifyJWT = require("../utils/verifyJWT");

cartRouter.route("/").get(verifyJWT, getAll).post(verifyJWT, createCart);

cartRouter
	.route("/:id")
	.get(verifyJWT, getOneCart)
	.delete(verifyJWT, removeCart)
	.put(verifyJWT, updateCart);

module.exports = cartRouter;
