import request from "supertest";
import moongose from "mongoose";
import app from "../../src/server";
import newProduct from "../data/new-product.json";

it("POST /api", async () => {
  // body 값과 함께 request 요청
  const response = await request(app).post("/api").send(newProduct);

  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
  expect(response.body.price).toBe(newProduct.price);
});

it("should return 500 on POST /api", async () => {
  // 에러 발생을 위해 잘못된 body 값을 전송합니다.
  const response = await request(app).post("/api").send({ name: "computer" });

  const errorMessage =
    "Product validation failed: description: Path `description` is required.";

  expect(response.statusCode).toBe(500);

  expect(response.body).toStrictEqual({
    message: errorMessage,
  });
});

afterAll(async () => {
  await moongose.connection.close();
});
