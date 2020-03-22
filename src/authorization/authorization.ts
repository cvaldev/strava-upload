import { AuthService } from "./AuthService";
import { Strategy } from "passport-strava";
import { configuration } from "../configuration/configuration";
import { IUser } from "../server/models/IUser";
import * as db from "../server/models/models";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import refresh from "passport-oauth2-refresh";
import { errLogger } from "../logger/logger";

const strategyName = "strava";
const loginRoute = "/oauth/strava";
const scope = "activity:write";

// Strava Oauth Strategy
const strategy = new Strategy(
    {
        clientID: configuration.clientID,
        clientSecret: configuration.clientSecret,
        callbackURL: configuration.callbackURL,
        state: true
    },
    async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
    ) => {
        const user: IUser = {
            id: profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken
        };

        try {
            const [found] = await db.findOrCreate(user);

            if (
                found.accessToken !== accessToken ||
                found.refreshToken !== refreshToken
            ) {
                // Update user if renewing auth.
                await db.update(user, accessToken, refreshToken);
            }
            return done(null, found);
        } catch (err) {
            errLogger.error(`ERROR: finding user in db. ${err}`);
            return done(err, null);
        }
    }
);

// Set strategy on passport and oauth refresh
passport.use(strategyName, strategy);
refresh.use(strategyName, strategy);

passport.serializeUser((user: IUser, done: any) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done: any) => {
    try {
        const user = await db.find(id);
        return done(null, user);
    } catch (e) {
        return done(e, null);
    }
});

// Express middleware setup
const middleware = [
    cookieParser(),
    session({
        secret: configuration.secret,
        resave: true,
        saveUninitialized: true
    }),
    bodyParser.urlencoded({ extended: false }),
    passport.initialize(),
    passport.session()
];

export const authService = new AuthService(
    strategyName,
    scope,
    loginRoute,
    configuration.secret,
    middleware
);
