const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Purcharse = sequelize.define("purcharse", {
	// productId
	// userId
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

module.exports = Purcharse;
