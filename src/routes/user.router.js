const {
	getAll,
	createUser,
	getOneUser,
	removeUser,
	updateUser,
	login,
} = require("../controllers/user.controllers");

const express = require("express");
const userRouter = express.Router();
const verifyJWT = require("../utils/verifyJWT");

userRouter.route("/").get(verifyJWT, getAll).post(createUser);

userRouter.route("/login").post(login);

userRouter
	.route("/:id")
	.get(verifyJWT, getOneUser)
	.delete(verifyJWT, removeUser)
	.put(verifyJWT, updateUser);

module.exports = userRouter;
