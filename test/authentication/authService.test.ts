import { authService } from "../../src/authorization";
import * as passport from "passport";
import * as jsonwebtoken from "jsonwebtoken";

const name = authService.name;
const scope = authService.scope;

afterEach(jest.clearAllMocks);
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

test("Can create a jwt token from id", () => {
    const spy = jest.spyOn(jsonwebtoken, "sign");
    authService.getJwt(0);
    expect(spy.mock.calls[0]).toContainEqual({ id: 0 });
});
