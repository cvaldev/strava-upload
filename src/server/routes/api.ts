import authService from "../../authorization";
import express from "express";
import {
    uploadFilesToStrava,
    getActivitiesFromStrava,
    saveTempFiles
} from "../controllers";

/**
 * API access points
 */

const router = express.Router();
router.use(authService.ensureAuthorized, authService.refreshToken);

router.post("/upload", saveTempFiles, uploadFilesToStrava);
router.get("/activities", getActivitiesFromStrava);

export default router;
