import { FastifyPluginAsync, RouteShorthandOptions } from "fastify";
import axios from "axios";
import { WeatherRequestGeneric } from "../types/types";

const opts: RouteShorthandOptions = {
  schema: {
    querystring: {
      lat: { type: "number", minimum: -90, maximum: 90 },
      lon: { type: "number", minimum: -180, maximum: 180 },
    },
    response: {
      "2xx": {
        type: ["boolean", "string"],
      },
    },
  },
};

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get<WeatherRequestGeneric>(
    "/weather",
    opts,
    async (request, reply) => {
      if (request.query.lat && request.query.lon) {
        const result = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${request.query.lat}&lon=${request.query.lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${process.env.OPENWEATHERMAPAPPID}`
        );

        reply
          .code(200)
          .header("Content-Type", "application/json; charset=utf-8")
          .send(result.data.current.temp > 15);
      }

      reply
        .code(400)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
          statusCode: 400,
          error: "Bad Request",
          message: "No latitude or longitude provided",
        });
    }
  );

  fastify.get<WeatherRequestGeneric>(
    "/weather/rio-cuarto",
    opts,
    async (request, reply) => {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=-33.1229869&lon=-64.3477571&exclude=minutely,hourly,daily,alerts&units=metric&appid=${process.env.OPENWEATHERMAPAPPID}`
      );

      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(result.data.current.temp > 15);
    }
  );
};

export default routes;
