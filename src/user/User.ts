export class User implements IUser {
    public id: number;
    public accessToken: string;
    public refreshToken: string;

    public constructor(acessToken: string, refreshToken: string, { id }) {
        this.id = id;
        this.accessToken = acessToken;
        this.refreshToken = refreshToken;
    }
}
