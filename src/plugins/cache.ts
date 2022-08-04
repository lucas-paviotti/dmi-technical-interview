import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import NodeCache from "node-cache";

const cache: FastifyPluginAsync = async (fastify) => {
  const nodeCache = new NodeCache();

  fastify.addHook("onRequest", async (request, reply) => {
    if (request.method == "GET") {
      const response = nodeCache.get(request.url);
      if (response != undefined) {
        reply
          .code(200)
          .header("Content-Type", "application/json; charset=utf-8")
          .send(response);
      }
    }
  });

  fastify.addHook("onSend", (request, reply, payload, done) => {
    if (request.method == "GET") {
      const response = nodeCache.get(request.url);
      if (response == undefined) {
        nodeCache.set(request.url, payload, 300);
      }
    }
    done();
  });
};

export default fp(cache);
