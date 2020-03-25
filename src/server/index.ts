import express from "express";
import authService from "../authorization";
import authRouter from "./routes/auth";
import apiRouter from "./routes/api";
import { join } from "path";

const server = express();
server.use(express.static(join(process.cwd(), "public")));
server.use(authService.middleware);
server.use("/oauth/strava", authRouter);
server.use("/api", apiRouter);

export default server;
