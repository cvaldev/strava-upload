import { AuthService } from "./AuthService";
import { Strategy } from "passport-strava";
import { configuration } from "../configuration";
import { User } from "../user/User";
import * as db from "../models";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import * as passport from "passport";
import * as refresh from "passport-oauth2-refresh";

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
        const user = new User(accessToken, refreshToken, profile);
        try {
            const [found] = await db.findOrCreate(user);
            return done(null, found);
        } catch (e) {
            return done(e, null);
        }
    }
);

// Set strategy on passport and oauth refresh
passport.use(strategyName, strategy);
refresh.use(strategyName, strategy);

passport.serializeUser((user: User, done: any) => {
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
