import { Sequelize, DataTypes } from "sequelize";
import { UserModel } from "./UserModel";
import { configuration } from "../configuration";

// Set up sequelize to use PostgreSQL database
const sequelize = new Sequelize(configuration.databaseURL, {
    dialectOptions: { ssl: true }
});

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            primaryKey: true
        },
        accessToken: DataTypes.STRING,
        refreshToken: DataTypes.STRING
    },
    { sequelize, tableName: "users" }
);

// Authenticate and connect to remote db.
export const init = () => sequelize.sync();

// Create a new user.
export const create = (user: IUser) => UserModel.create(user);

// Find a single user.
export const find = (id: number) => UserModel.findOne({ where: { id: id } });
// Attempt to find the user or create a new instance.
export const findOrCreate = (user: IUser) =>
    UserModel.findOrCreate({ where: { id: user.id }, defaults: user });

// Update the tokens associated to a user.
export const update = (
    user: IUser,
    accessToken: string,
    refreshToken: string
) =>
    UserModel.update(
        { accessToken: accessToken, refreshToken: refreshToken },
        {
            where: {
                id: user.id
            }
        }
    );
