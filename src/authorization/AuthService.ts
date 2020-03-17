import * as passport from "passport";
import * as refresh from "passport-oauth2-refresh";
import * as fetch from "node-fetch";
import * as db from "../models";
import { sign, verify } from "jsonwebtoken";
import { Handler, Request, Response, NextFunction } from "express";

/**
 * AuthService defines the needed functions to authenticate and verify a user.
 */
export class AuthService {
    private _name: string;
    private _middleware: Handler[];
    private _scope: string;
    private _loginRoute: string;
    private _secret: string;

    public constructor(
        name: string,
        scope: string,
        loginRoute: string,
        secret: string,
        middleware: Handler[]
    ) {
        this._name = name;
        this._middleware = middleware;
        this._scope = scope;
        this._loginRoute = loginRoute;
        this._secret = secret;
    }

    // Express middleware
    public get middleware(): Handler[] {
        return this._middleware;
    }

    // Decides what happens after the user authenticates for the first time.
    public handleRedirect = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { state, scope } = req.query;
        const requiredScope = "read," + this._scope;
        console.log("Scope: " + (scope === requiredScope));
        if (state === "tokenize") {
            // Extract user id from req.user
            const { id } = <IUser>req.user;

            // Create a jwt and send it back in the response.
            const token = this.getJwt(id);
            res.json({ token: token });
            return;
        }
        next();
    };

    // Makes sure the user's tokens stay updated in our db.
    public refreshToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const user = <IUser>req.user;
        console.log(`Refreshing token for ${user.id}`);
        // TODO: this shouldn't be here, maybe create an instance of the post request and repeat it if 1st time was unsuccesful.
        const response = await fetch("https://www.strava.com/api/v3/athlete", {
            headers: { Authorization: `Bearer ${user.accessToken}` }
        });

        if (!response.ok) {
            // Our token has possibly expired, try to refresh it.
            // TODO: make sure token has expired and we still have permissions.
            // Can I just request a new one everytime anyways?
            refresh.requestNewAccessToken(
                this._name,
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

    // Ensures the user is logged in.
    public ensureLogin = (req: Request, res: Response, next: NextFunction) => {
        console.log("Checking log in");
        if (req.isAuthenticated()) {
            console.log("Authenticated!");
            return next();
        }
        res.redirect(this._loginRoute);
    };

    // Ensure the user is authorized to use this route
    public ensureAuthorized = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        // Select authentication type.
        const { authorization } = req.headers;
        if (authorization) {
            // Use token
            return this.verifyToken(req, res, next);
        } else {
            // Use session
            return this.ensureLogin(req, res, next);
        }
    };

    // Verify the jwt
    public verifyToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        console.log("Checking token");
        const { authorization } = req.headers;
        if (authorization) {
            const [type, token] = authorization.split(" ");
            try {
                const data = verify(token, this._secret);

                // @ts-ignore: id doesn't exist
                const user = await db.find(data.id);
                if (user) {
                    // Load the user in the request and move on.
                    req.user = user;
                    next();
                }
            } catch (e) {
                res.status(403).send(e);
                return;
            }
        }

        // Deny entry if bad token or no user in db.
        res.sendStatus(403);
    };

    // Create a jwt
    public getJwt = (id: number) => {
        return sign({ id: id }, this._secret);
    };

    // Use the passport to authenticate a user.
    public authenticate = (...args: any): any => {
        return passport.authenticate(this._name, ...args);
    };

    // Initial login with the required scopes and state.
    public login = (state?: string, force?: boolean): any => {
        const { _scope: scope } = this;
        if (force) {
            return this.authenticate({
                scope: scope,
                approval_prompt: "force"
            });
        }

        return this.authenticate({ scope: scope, state: state });
    };

    // Check if authentication was accepted by user during first redirect.
    public verifyRedirect = (): any => {
        return this.authenticate({ failureRedirect: this._loginRoute });
    };
}
