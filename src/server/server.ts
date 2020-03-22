import express from "express";
import { authService } from "../authorization";
import { authRouter, apiRouter } from "./routes";

const server = express();

server.use(express.static("public"));
server.use(authService.middleware);
server.use("/oauth/strava", authRouter);
server.use("/api", apiRouter);

export default server;
