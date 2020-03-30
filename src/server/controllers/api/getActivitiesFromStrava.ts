import { Request, Response } from "express";
import { IUser } from "../../../interfaces";
import { logger } from "../../../logger";
import { getActivities } from "../../../utils";

const getActivitiesFromStrava = async (req: Request, res: Response) => {
    const { page, perPage } = req.query;
    const { accessToken } = <IUser>req.user;
    const activities = await getActivities(accessToken, page, perPage);

    logger.debug("GETTING ACTIVITIES");
    res.json({ activities });
};

export default getActivitiesFromStrava;
