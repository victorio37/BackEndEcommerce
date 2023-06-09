const {
	getAll,
	createProduct,
	getOneProduct,
	removeProduct,
	updateProduct,
	setProductImgs,
} = require("../controllers/product.controllers");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT");

const productRouter = express.Router();

productRouter.route("/").get(getAll).post(verifyJWT, createProduct);

productRouter.route("/:id/images").post(verifyJWT, setProductImgs);

productRouter
	.route("/:id")
	.get(getOneProduct)
	.delete(verifyJWT, removeProduct)
	.put(verifyJWT, updateProduct);

module.exports = productRouter;
