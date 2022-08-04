import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import NodeCache from "node-cache";

const cache: FastifyPluginAsync = async (fastify) => {
  const nodeCache = new NodeCache();
  const TTL = 15;

  fastify.addHook("onRequest", async (request, reply) => {
    if (request.method == "GET") {
      // get key, return reply 200 if something was found
      const response = nodeCache.get(request.url);
    }
  });

  fastify.addHook("onSend", (request, reply, payload, done) => {
    if (request.method == "GET") {
      // get key, set in cache if not defined
    }
  });
};

export default fp(cache);
