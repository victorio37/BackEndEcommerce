const {
	getAll,
	createCategory,
	getOneCategory,
	removeCategory,
	updateCategory,
} = require("../controllers/category.controllers");

const express = require("express");
const categoryRouter = express.Router();
const verifyJWT = require("../utils/verifyJWT");

categoryRouter.route("/").get(getAll).post(verifyJWT, createCategory);

categoryRouter
	.route("/:id")
	.get(getOneCategory)
	.delete(verifyJWT, removeCategory)
	.put(verifyJWT, updateCategory);

module.exports = categoryRouter;
