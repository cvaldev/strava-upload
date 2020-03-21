import * as SequelizeMock from "sequelize-mock";

const sequelize = new SequelizeMock();

// Create a new user.
export const create = (user: IUser) => "created";

// Find a single user.
export const find = (id: number) => "found";
// Attempt to find the user or create a new instance.
export const findOrCreate = (user: IUser) => "foundOrCreated";

// Update the tokens associated to a user.
export const update = (
    user: IUser,
    accessToken: string,
    refreshToken: string
) => "updated";
