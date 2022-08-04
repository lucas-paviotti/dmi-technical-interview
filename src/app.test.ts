import build from "./app";
import { test } from "tap";

test('GET "/" - Route not found', async (t) => {
  const fastify = build();

  t.teardown(() => {
    fastify.close();
  })

  const response = await fastify.inject({
    method: "GET",
    url: "/",
  });

  t.equal(response.statusCode, 404);
});
