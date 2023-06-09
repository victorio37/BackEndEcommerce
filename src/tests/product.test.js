const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const ProductImg = require("../models/ProductImg");
require("../models");

let token;
let productId;

beforeAll(async () => {
	const res = await request(app)
		.post("/users/login")
		.send({ email: "vvera@senati.pe", password: "victor123456" });

	token = res.body.token;
});

test("POST /products should return status 201 and successfully create a new product", async () => {
	const category = await Category.create({ name: "tech" });
	const res = await request(app)
		.post("/products")
		.send({
			title: "Smartphone Galaxi S22",
			description: "celular de alta gama",
			brand: "Samsung",
			categoryId: category.id,
			price: 2500,
		})
		.set("Authorization", `Bearer ${token}`);

	productId = res.body.id;
	category.destroy();
	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
	expect(res.body.categoryId).toBeDefined();
});

test("GET /products should return status 200 and get the product we just created", async () => {
	const res = await request(app).get("/products");
	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("PUT /products/:id should return status 200 and successfully udpate the current product", async () => {
	const res = await request(app)
		.put(`/products/${productId}`)
		.send({ price: 2500 })
		.set("Authorization", `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body.price).toBe(1000);
});

test("POST /products/:/images should return status 200 ans successfully set the image to the current product", async () => {
	const image = await ProductImg.create({
		url: "http://falseUrl.com",
		publicId: "false id",
	});

	const res = await request(app)
		.post(`/products/${productId}/images`)
		.send([image.id])
		.set("Authorization", `Bearer ${token}`);

	await image.destroy();

	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("DELETE /products/:id should return status 204 and successfully remove the current products from the database", async () => {
	const res = await request(app)
		.delete(`/products/${productId}`)
		.set("Authorization", `Bearer ${token}`);
	expect(res.status).toBe(204);
});
