const catchError = require("../utils/catchError");
const Product = require("../models/Product");
const Category = require("../models/Category");
const ProductImg = require("../models/ProductImg");
const { Op } = require("sequelize");

const getAll = catchError(async (req, res) => {
	const { title, categoryId } = req.query;
	const where = {};

	if (title) where.title = { [Op.iLike]: `%${title}%` };
	if (categoryId) where.categoryId = categoryId;
	const products = await Product.findAll({
		include: [Category, ProductImg],
		where,
	});
	return res.json(products);
});

const createProduct = catchError(async (req, res) => {
	const { title, description, brand, categoryId, price } = req.body;
	const product = await Product.create({
		title,
		description,
		brand,
		categoryId,
		price,
	});
	return res.status(201).json(product);
});

const getOneProduct = catchError(async (req, res) => {
	const { id } = req.params;
	const product = await Product.findByPk(id, {
		include: [Category, ProductImg],
	});
	if (!product) return res.sendStatus(404);
	return res.json(product);
});

const removeProduct = catchError(async (req, res) => {
	const { id } = req.params;
	await Product.destroy({ where: { id } });
	return res.sendStatus(204);
});

const updateProduct = catchError(async (req, res) => {
	const { id } = req.params;
	const { title, description, price, brand } = req.body;
	const updatedProduct = await Product.update(
		{ title, description, price, brand },
		{ where: { id }, returning: true }
	);

	return res.json(updatedProduct[1][0]);
});

const setProductImgs = catchError(async (req, res) => {
	const { id } = req.params;
	const product = await Product.findByPk(id);
	if (!product) return res.status(404).json({ message: "Product not found" });
	await product.setProductImgs(req.body);
	const images = await product.getProductImgs();
	return res.json(images);
});

module.exports = {
	getAll,
	createProduct,
	getOneProduct,
	removeProduct,
	updateProduct,
	setProductImgs,
};
