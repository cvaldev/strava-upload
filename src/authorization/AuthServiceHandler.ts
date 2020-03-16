import { NextFunction, Request, Response } from "express";
import * as fetch from "node-fetch";
import * as db from "../models";
import * as refresh from "passport-oauth2-refresh";
import * as passport from "passport";

/**
 * AuthServiceHandler defines the handlers that are needed for the
 * authentication process.
 */

export class AuthServiceHandler {
    public name: string;
    public scope: string;
    public loginRoute: string;

    constructor(name: string, scope: string, loginRoute: string) {
        this.name = name;
        this.scope = scope;
        this.loginRoute = loginRoute;
    }

    // Get a new token from Strava and update the user in the database.
    public refreshTokenHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        console.log("Refreshing token");
        const user = <IUser>req.user;

        // TODO: this shouldn't be here, maybe create an instance of the post request and repeat it if 1st time was unsuccesful.
        const response = await fetch("https://www.strava.com/api/v3/athlete", {
            headers: { Authorization: `Bearer ${user.accessToken}` }
        });

        if (!response.ok) {
            // Our token has possibly expired, try to refresh it.
            // TODO: make sure token has expired and we still have permissions.
            refresh.requestNewAccessToken(
                this.name,
                user.refreshToken,
                async (err, accessToken, refreshToken) => {
                    if (err || !accessToken) {
                        res.status(401).json({
                            error: err ?? "An error occurred"
                        });
                    }
                    await db.update(user, accessToken, refreshToken);
                    console.log(`${user.id} updated`);
                }
            );

            req.user = user;
            console.log(`req.user updated ${user.id}`);
        }

        return next();
    };

    // What to do after the user succesfully authenticated.
    public redirectHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const { state, scope } = req.query;
        const requiredScope = "read," + this.scope;
        console.log(scope === requiredScope);
        if (state) {
            // Send POST request to state(aka client temp server) w/token
            const { state: response_url } = req.query;

            // TODO: send an authorization token (jwt?) and not just plain id.
            // @ts-ignore: id doesn't exist
            const options = { method: "POST", headers: { token: req.user.id } };
            const response = await fetch(response_url, options);

            // res.redirect(req.query.state);

            if (!response.ok) {
                res.send("Something went wrong");
                return;
            }
            next();
        }
        next();
    };

    // Authenticate using passport strategy.
    public authenticationHandler = (...args: any) => {
        return passport.authenticate(this.name, ...args);
    };

    // Redirect user back to login if not authenticated.
    public ensureLoginHandler = (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        console.log("Checking log in");
        if (req.isAuthenticated()) {
            console.log("Authenticated!");
            return next();
        }
        res.redirect(this.loginRoute);
    };
}
