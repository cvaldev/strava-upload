import next from "next";
import server from "./src/server";
import { init } from "./src/server/models";
import configuration from "./src/configuration";

const PORT = process.env.PORT || 8080;
const dev = configuration.env !== "production";
const app = next({
    dev,
    conf: { exportPathMap: () => ({ "/": { page: "/" } }) }
});
const handle = app.getRequestHandler();

(async () => {
    try {
        await init();
        await app.prepare();

        server.get("*", (req, res) => handle(req, res));

        server.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    } catch (error) {
        throw error;
    }
})();
