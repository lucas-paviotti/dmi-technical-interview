import { RequestGenericInterface } from "fastify";

export interface WeatherRequestGeneric extends RequestGenericInterface {
  Querystring: {
    lat?: number,
    lon?: number,
  }
}
