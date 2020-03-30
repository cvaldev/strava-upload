import express from "express";
import authService from "../../authorization";
import { login, redirect } from "../controllers";

/**
 * Authentication access points.
 */
const router = express.Router();

router.get("/", login);

router.get(
    "/redirect",
    authService.verifyRedirect,
    authService.handleRedirect,
    redirect
);

export default router;
