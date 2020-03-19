import app from "../app";
import * as request from "supertest";

test("Can GET /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
});
