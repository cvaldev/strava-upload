import { config } from "dotenv";
config();

/**
 * Server configuration.
 */
export const configuration: IConfiguration = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    secret: process.env.SECRET,
    databaseURL: process.env.DATABASE_URL
};
