import { Model, BuildOptions } from "sequelize";
import { IUser } from "./IUser";

interface UserModel extends Model, IUser {
    id: number;
    accessToken: string;
    refreshToken: string;
}

export type UserModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
};
