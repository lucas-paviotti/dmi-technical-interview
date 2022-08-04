import { fastify } from "fastify";
import weatherRoute from "./routes/weather";
import fastifyFavicon from "fastify-favicon";
import dotenv from "dotenv";
import cache from "./plugins/cache";

const build = (opts = {}) => {
  dotenv.config();

  const app = fastify(opts);

  app.register(weatherRoute);
  app.register(fastifyFavicon);
  // app.register(cache);
  app.setNotFoundHandler((request, reply) => {
    reply
      .code(404)
      .header("Content-Type", "application/json; charset=utf-8")
      .send("Endpoint not found");
  });

  return app;
}

export default build;
