const catchError = require("../utils/catchError");
const Purcharse = require("../models/Purcharse");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const ProductImg = require("../models/ProductImg");

const getAll = catchError(async (req, res) => {
	const purcharses = await Purcharse.findAll({
		include: [
			{
				model: Product,
				include: [ProductImg],
			},
		],
		where: { userId: req.user.id },
	});
	return res.json(purcharses);
});

const buyCart = catchError(async (req, res) => {
	const cartProducts = await Cart.findAll({
		where: { userId: req.user.id },
		attributes: ["userId", "productId", "quantity"],
		raw: true,
	});
	await Purcharse.bulkCreate(cartProducts);
	await Cart.destroy({ where: { userId: req.user.id } });
	return res.json(cartProducts);
});

module.exports = {
	getAll,
	buyCart,
};
