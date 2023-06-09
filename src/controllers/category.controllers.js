const catchError = require("../utils/catchError");
const Category = require("../models/Category");
const Product = require("../models/Product");

const getAll = catchError(async (req, res) => {
	const categories = await Category.findAll({ include: [Product] });
	return res.json(categories);
});

const createCategory = catchError(async (req, res) => {
	const { name } = req.body;
	const Createdcategory = await Category.create({ name });
	return res.status(201).json(Createdcategory);
});

const getOneCategory = catchError(async (req, res) => {
	const { id } = req.params;
	const category = await Category.findByPk(id, { include: [Product] });
	if (!category) return res.sendStatus(204);
	return res.json(category);
});

const removeCategory = catchError(async (req, res) => {
	const { id } = req.params;
	await Category.destroy({ where: { id } });
	return res.sendStatus(204);
});

const updateCategory = catchError(async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	const updatedCategory = await Category.update(
		{ name },
		{ where: { id }, returning: true }
	);

	return res.json(updatedCategory[1][0]);
});

module.exports = {
	getAll,
	createCategory,
	getOneCategory,
	removeCategory,
	updateCategory,
};
