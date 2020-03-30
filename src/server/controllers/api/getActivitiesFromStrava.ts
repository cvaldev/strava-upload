import { Request, Response } from "express";
import { IUser } from "../../../interfaces";
import { logger } from "../../../logger";
import strava from "strava-v3";

const getActivitiesFromStrava = async (req: Request, res: Response) => {
    const { page, perPage } = req.query;
    const { accessToken } = <IUser>req.user;
    const activities = await getActivities(accessToken, page, perPage);

    logger.debug("GETTING ACTIVITIES");
    res.json({ activities });
};

const getActivities = (
    accessToken: string,
    page?: number,
    perPage?: number
) => {
    return strava.athlete.listActivities({
        access_token: accessToken,
        page: page,
        per_page: perPage
    });
};

export default getActivitiesFromStrava;
