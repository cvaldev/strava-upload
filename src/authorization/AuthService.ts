import { Handler, Request, Response, NextFunction } from "express";
import { AuthServiceHandler } from "./AuthServiceHandler";

/**
 * AuthService defines the needed functions to authenticate and verify a user.
 */
export class AuthService {
    private _name: string;
    private _middleware: Handler[];
    public authServiceHandler: AuthServiceHandler;

    public constructor(
        name: string,
        scope: string,
        loginRoute: string,
        middleware: Handler[]
    ) {
        this._name = name;
        this._middleware = middleware;
        this.authServiceHandler = new AuthServiceHandler(
            name,
            scope,
            loginRoute
        );
    }

    // Middleware handlers.
    public get middleware(): Handler[] {
        return this._middleware;
    }

    // Name of this AuthService.
    public get name(): string {
        return this._name;
    }

    // Scope of this AuthService.
    public get scope(): string {
        return this.authServiceHandler.scope;
    }

    // Login Route of this AuthService.
    public get loginRoute(): string {
        return this.authServiceHandler.loginRoute;
    }

    // What happens after the user authenticates for the first time.
    public handleRedirect = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        return this.authServiceHandler.redirectHandler(req, res, next);
    };

    // Makes sure the user stays authenticated.
    public refreshToken = (req: Request, res: Response, next: NextFunction) => {
        return this.authServiceHandler.refreshTokenHandler(req, res, next);
    };

    // Ensures the user has logged in.
    public ensureLogin = (req: Request, res: Response, next: NextFunction) => {
        return this.authServiceHandler.ensureLoginHandler(req, res, next);
    };

    // Use the authentication handler to authenticate a user.
    public authenticate = (...args: any): any => {
        return this.authServiceHandler.authenticationHandler(...args);
    };

    // Initial login with the required scopes and state.
    public login = (state?: string, force?: boolean): any => {
        const { scope } = this;
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
        return this.authenticate({ failureRedirect: this.loginRoute });
    };
}
