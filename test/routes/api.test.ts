import router from "../../src/server/routes/api";
import authService from "../../src/authorization";
import { join } from "path";
import * as utils from "../../src/utils";
import express from "express";
import request from "supertest";
import refresh from "passport-oauth2-refresh";

const app = express();
app.use(router);

afterEach(jest.restoreAllMocks);

describe("/upload", () => {
    test("Redirects if not logged in", async () => {
        const response = await request(app).post("/upload");

        expect(response.status).toBe(302);
    });
    test("Denies access if bad token", async () => {
        const response = await request(app)
            .post("/upload")
            .set("Authorization", "Bearer 0000");

        expect(response.status).toBe(403);
    });

    test("Keeps accessToken updated", async () => {
        jest.spyOn(authService, "ensureLogin").mockImplementation(
            (req, res, next) => {
                req.user = { refreshToken: 0 };
                return next();
            }
        );
        const spy = jest.spyOn(refresh, "requestNewAccessToken");

        await request(app).post("/upload");

        expect(spy).toHaveBeenCalled();
    });

    test("Can process a single file for upload", async () => {
        jest.spyOn(authService, "ensureLogin").mockImplementation(
            (req, res, next) => {
                req.user = { refreshToken: 0 };
                return next();
            }
        );

        jest.spyOn(authService, "updateAccessToken").mockResolvedValue({
            id: 0
        });
        jest.spyOn(utils, "uploadFile").mockResolvedValue(
            Promise.resolve(["success", null])
        );
        const response = await request(app)
            .post("/upload")
            .attach("file", join(__dirname, "../../README.md"));

        expect(response.status).toBe(200);
    });
});
