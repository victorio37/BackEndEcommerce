const catchError = require("../utils/catchError");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = catchError(async (req, res) => {
	const users = await User.findAll();
	return res.json(users);
});

const createUser = catchError(async (req, res) => {
	const { firstName, lastName, email, password, phone } = req.body;
	const createdUser = await User.create({
		firstName,
		lastName,
		email,
		password,
		phone,
	});

	return res.status(201).json(createdUser);
});

const getOneUser = catchError(async (req, res) => {
	const { id } = req.params;
	const user = await User.findByPk(id);
	if (!user) return res.sendStatus(204);
	return res.json(user);
});

const removeUser = catchError(async (req, res) => {
	const { id } = req.params;
	await User.destroy({ where: { id } });
	return res.sendStatus(204);
});

const updateUser = catchError(async (req, res) => {
	const { id } = req.params;
	const { firstName, lastName, email, phone } = req.body;
	const updatedUser = await User.update(
		{
			firstName,
			lastName,
			email,
			phone,
		},
		{ where: { id }, returning: true }
	);

	return res.json(updatedUser[1][0]);
});

const login = catchError(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ where: { email } });
	if (!user) return res.status(401).json({ message: "Invalid Credentials" });

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword)
		return res.status(401).json({ message: "Invalid Credentials" });

	const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
		expiresIn: "1d",
	});

	return res.json({ user, token });
});

module.exports = {
	getAll,
	createUser,
	getOneUser,
	removeUser,
	updateUser,
	login,
};
