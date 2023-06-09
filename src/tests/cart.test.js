const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");

let token;
let userId;
let cartId;

beforeAll(async () => {
	const res = await request(app)
		.post("/users/login")
		.send({ email: "vvera@senati.pe", password: "victor123456" });

	token = res.body.token;
	userId = res.body.user.id;
});

test("POST /cart should return status 201 and create a new cart ", async () => {
	const product = await Product.create({
		title: "my Product",
		description: "my Description",
		brand: "my Brand",
		price: 100,
	});

	const res = await request(app)
		.post("/cart")
		.send({ userId, productId: product.id, quantity: 1 })
		.set("Authorization", `Bearer ${token}`);

	cartId = res.body.id;
	product.destroy();
	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
});

test("GET /cart should return status 200 and get the cart we just created", async () => {
	const res = await request(app)
		.get("/cart")
		.set("Authorization", `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("PUT /cart/:id should return status 200 and successfully update the current cart", async () => {
	const res = await request(app)
		.put(`/cart/${cartId}`)
		.send({ quantity: 5 })
		.set("Authorization", `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body.quantity).toBe(5);
});

test("DELETE /cart/:id should return status 204 and successfully remove the current cart from the database", async () => {
	const res = await request(app)
		.delete(`/cart/${cartId}`)
		.set("Authorization", `Bearer ${token}`);

	expect(res.status).toBe(204);
});
