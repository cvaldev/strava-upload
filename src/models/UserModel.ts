import { Model, BuildOptions } from "sequelize";

interface IUser extends Model {
    id: number;
    accessToken: string;
    refreshToken: string;
}

export type UserModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IUser;
};
