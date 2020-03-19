import { router } from "../../src/routes/auth";
import * as express from "express";
import * as request from "supertest";
import * as passport from "passport";

const app = express();

app.use(router);
afterEach(jest.clearAllMocks);

describe("/", () => {
    test("GET / starts oauth flow", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(302);
    });

    test("Can GET / to login", async () => {
        const spy = jest.spyOn(passport, "authenticate");
        await request(app).get("/");
        expect(spy).toHaveBeenCalled();
    });
});
describe("/redirect", () => {
    test("Can GET /redirect", async () => {
        const response = await request(app).get(`/redirect`);
        expect(response.status).toBe(200);
    });
});
