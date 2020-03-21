import { authService } from "../../src/authorization";
import * as db from "../../src/models";
import * as passport from "passport";
import * as jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const name = authService.name;
const scope = authService.scope;
let req: Request, res: Response, next: NextFunction;
beforeEach(() => {
    req = <Request>{ query: {}, headers: {} };
    res = <Response>{};
    next = <NextFunction>jest.fn();
    req.isAuthenticated = jest.fn();
    res.redirect = jest.fn();
});

afterEach(() => {
    req = <Request>{};
    res = <Response>{};
    next = <NextFunction>jest.fn();
    req.isAuthenticated = jest.fn();
    jest.restoreAllMocks();
});

test("Can create a jwt token from id", () => {
    const spy = jest.spyOn(jsonwebtoken, "sign");
    authService.getJwt(0);
    expect(spy.mock.calls[0]).toContainEqual({ id: 0 });
});

describe("login", () => {
    test("Can log in", () => {
        const spy = jest.spyOn(passport, "authenticate");
        authService.login();
        expect(spy).toHaveBeenCalled();
    });

    test("Can log in with a custom state", () => {
        const spy = jest.spyOn(passport, "authenticate");
        authService.login("state");
        expect(spy).toHaveBeenCalledWith(name, { scope, state: "state" });
    });
});

describe("ensureAuthorized", () => {
    test("Can ensure log in", () => {
        req.headers = {};
        const spy = jest.spyOn(authService, "ensureLogin");
        authService.ensureAuthorized(req, res, next);
        expect(spy).toHaveBeenCalled();
    });

    test("Can use token verification", async () => {
        req.headers = { authorization: "221" };
        res.sendStatus = jest.fn();
        const spy = jest
            .spyOn(authService, "verifyToken")
            .mockResolvedValue(Promise.resolve());

        await authService.ensureAuthorized(req, res, next);
        expect(spy).toHaveBeenCalled();
    });
});

describe("ensureLogin", () => {
    test("Can redirect user if not logged in", () => {
        req.headers = {};
        req.isAuthenticated = jest.fn().mockReturnValue(false);
        res.redirect = jest.fn();

        authService.ensureLogin(req, res, next);

        expect(res.redirect).toHaveBeenCalled();
    });

    test("Can allow user if authenticated", () => {
        req.headers = {};
        req.isAuthenticated = jest.fn().mockReturnValue(true);

        authService.ensureLogin(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});

describe("verifyToken", () => {
    test("Can verify a jwt token", async () => {
        jest.spyOn(jsonwebtoken, "verify").mockImplementation(() => ({
            id: 0
        }));

        req.headers = { authorization: "Bearer 0000" };
        await authService.verifyToken(req, res, next);

        expect(next).toHaveBeenCalled();
    });
    test("Denies access if invalid token", async () => {
        res.sendStatus = jest.fn().mockReturnValue("denied");
        req.headers = { authorization: "Bearer invalid" };
        const result = await authService.verifyToken(req, res, next);

        expect(result).toBe("denied");
    });

    test("Denies access if no token is provided", async () => {
        res.sendStatus = jest.fn().mockReturnValue("denied");
        const result = await authService.verifyToken(req, res, next);

        expect(result).toBe("denied");
    });
});

describe("handleRedirect", () => {
    test("Can pass to next", (done) => {
        const next = <NextFunction>jest.fn(done);
        authService.handleRedirect(req, res, next);
        expect(next).toHaveBeenCalled();
    });
    test("Can return jwt in res", () => {
        const spy = jest.spyOn(jsonwebtoken, "sign");

        req.query.state = "tokenize";
        req.user = { id: 0 };
        res.json = jest.fn().mockReturnValue("token");

        const result = authService.handleRedirect(req, res, next);
        expect(spy).toHaveBeenCalled();
        expect(result).toBe("token");
    });
});
