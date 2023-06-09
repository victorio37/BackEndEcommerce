const request = require("supertest");
const app = require("../app");
require("../models");

let token;
let categoryId;

beforeAll(async () => {
	const res = await request(app)
		.post("/users/login")
		.send({ email: "vvera@senati.pe", password: "victor123456" });

	token = res.body.token;
});

test("POST /categories should return status 201 and successfully create a new category", async () => {
	const res = await request(app)
		.post("/categories")
		.send({ name: "Computers" })
		.set("Authorization", `Bearer ${token}`);

	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();

	categoryId = res.body.id;
});

test("GET /categories should return status 200 and get the category we just created", async () => {
	const res = await request(app).get("/categories");
	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("/PUT /categories/:id should return status 200 and successfully update the current category", async () => {
	const res = await request(app)
		.put(`/categories/${categoryId}`)
		.send({ name: "SmartPhones" })
		.set("Authorization", `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body.name).toBe("SmartPhones");
});

test("DELETE /categories/:id should return status 204 and successfully remove the current category from the database", async () => {
	const res = await request(app)
		.delete(`/categories/${categoryId}`)
		.set("Authorization", `Bearer ${token}`);

	expect(res.status).toBe(204);
});
