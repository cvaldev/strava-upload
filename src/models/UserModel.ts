import { Model } from "sequelize";

// UserModel to be used on PostgreSQL DataBase.
export class UserModel extends Model implements IUser {
    public id!: number;
    public accessToken!: string;
    public refreshToken!: string;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}
