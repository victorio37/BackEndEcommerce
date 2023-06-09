const Product = require("./Product");
const Category = require("./Category");
const ProductImg = require("./ProductImg");
const Cart = require("./Cart");
const User = require("./User");
const Purcharse = require("./Purcharse");

Product.belongsTo(Category);
Category.hasMany(Product);

Product.hasMany(ProductImg);
ProductImg.belongsTo(Product);

Cart.belongsTo(User);
User.hasMany(Cart);

Cart.belongsTo(Product);
Product.hasMany(Cart);

Purcharse.belongsTo(User);
User.hasMany(Purcharse);

Purcharse.belongsTo(Product);
Product.hasMany(Purcharse);
