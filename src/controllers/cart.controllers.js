const catchError = require("../utils/catchError");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const ProductImg = require("../models/ProductImg");

const getAll = catchError(async (req, res) => {
	const userId = req.user.id; // ==> con req.user.id podemos acceder al usuario logeado, este mismo esta disponible unicamente cuando la ruta esta protegida, de lo contrario seria undefined
	const carts = await Cart.findAll({
		include: [
			{
				model: Product,
				include: [ProductImg],
			},
		],
		where: { userId },
	});
	return res.json(carts);
});

const createCart = catchError(async (req, res) => {
	const { productId, quantity } = req.body;
	const cart = await Cart.create({
		userId: req.user.id,
		productId,
		quantity,
	});
	return res.status(201).json(cart);
});

const getOneCart = catchError(async (req, res) => {
	const { id } = req.params;
	const cart = await Cart.findByPk(id, {
		include: [
			{
				model: Product,
				include: [ProductImg],
			},
		],
	});
	if (!cart) return res.sendStatus(404);
	return res.json(cart);
});

const removeCart = catchError(async (req, res) => {
	const { id } = req.params;
	await Cart.destroy({ where: { id } });
	return res.sendStatus(204);
});

const updateCart = catchError(async (req, res) => {
	const { id } = req.params;
	const { quantity } = req.body;
	const updatedCart = await Cart.update(
		{ quantity },
		{ where: { id }, returning: true }
	);

	return res.json(updatedCart[1][0]);
});

module.exports = {
	getAll,
	createCart,
	getOneCart,
	removeCart,
	updateCart,
};
