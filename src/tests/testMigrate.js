const User = require("../models/User");
const sequelize = require("../utils/connection");
require("../models/User");
require("../models/Category");
require("../models");
require("../models/Product");

const main = async () => {
	try {
		await sequelize.sync({ force: true });

		await User.create({
			firstName: "victor",
			lastName: "vera",
			email: "vvera@senati.pe",
			password: "victor123456",
			phone: "912998211",
		});

		process.exit();
	} catch (error) {
		console.log(error);
	}
};

main();
