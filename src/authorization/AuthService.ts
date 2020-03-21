import * as passport from "passport";
import * as refresh from "passport-oauth2-refresh";
import * as db from "../models/models";
import { sign, verify } from "jsonwebtoken";
import { Handler, Request, Response, NextFunction } from "express";
import { IUser } from "../models/IUser";
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
    public get name(): string {
        return this._name;
    }
    public get scope(): string {
        return this._scope;
    }

    // Decides what happens after the user authenticates for the first time.
    public handleRedirect = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { state, scope } = req.query;
        const requiredScope = "read," + this._scope;
        console.log("Scope: " + (scope === requiredScope));
        if (state === "tokenize" && req.user) {
            // Extract user id from req.user
            const { id } = <IUser>req.user;

            // Create a jwt and send it back in the response.
            const token = this.getJwt(id);
            return res.json({ token: token });
        }
        return next();
    };

    // Makes sure the user's tokens stay updated in our db.
    public refreshToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.updateAccessToken(<IUser>req.user);
            req.user = user;
            return next();
        } catch (error) {
            return res.status(401).send(error);
        }
    };

    // Returns either the updated user or user if token is still valid.
    // Gets a new token for user and updates the database.
    public updateAccessToken = (user: IUser) => {
        return new Promise((resolve, reject) => {
            refresh.requestNewAccessToken(
                this._name,
                user.refreshToken,
                async (err, accessToken, refreshToken) => {
                    console.log(`${user.id} refreshing `);
                    if (err || !accessToken) {
                        reject({
                            error: err ?? "An error occurred"
                        });
                    } else if (
                        user.accessToken !== accessToken ||
                        user.refreshToken !== refreshToken
                    ) {
                        await db.update(user, accessToken, refreshToken);
                        resolve(db.find(user.id));
                        console.log(`${user.id} updated`);
                    }
                    resolve(user);
                }
            );
        });
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

    // Ensures the user is logged in.
    public ensureLogin = (req: Request, res: Response, next: NextFunction) => {
        console.log("Checking log in");
        if (req.isAuthenticated()) {
            console.log("Authenticated!");
            return next();
        }
        return res.redirect(this._loginRoute);
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
                    return next();
                }
            } catch (e) {
                return res.sendStatus(403);
            }
        }
        // Deny entry if bad token or no user in db.
        return res.sendStatus(403);
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
    public verifyRedirect = (
        req: Request,
        res: Response,
        next: NextFunction
    ): any => {
        return this.authenticate({ failureRedirect: this._loginRoute })(
            req,
            res,
            next
        );
    };
}
