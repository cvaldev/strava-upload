import strava from "strava-v3";
import { deleteTempFile } from ".";

export const uploadFile = async (
    accessToken: string,
    dataType: string,
    file: string
): Promise<[any, any]> => {
    try {
        const payload = await strava.uploads.post(
            {
                access_token: accessToken,
                data_type: dataType,
                file: file
            },
            () => {}
        );

        deleteTempFile(file);
        return [payload, null];
    } catch (error) {
        deleteTempFile(file);
        return [null, error];
    }
};
export const getActivities = (
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
