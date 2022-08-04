import build from "../app";
import { test } from "tap";
import { faker } from "@faker-js/faker";

test('GET "/weather" - Get boolean from the provided latitude and longitude', async (t) => {
  const lat = faker.address.latitude();
  const lon = faker.address.longitude();

  const fastify = build();

  t.teardown(() => {
    fastify.close();
  });

  const response = await fastify.inject({
    method: "GET",
    url: `/weather?lat=${lat}&lon=${lon}`,
  });

  t.equal(response.statusCode, 200);
  t.type(JSON.parse(response.body), "boolean");
});

test('GET "/weather" - Get an error if latitude is not provided', async (t) => {
  const lon = faker.address.longitude();

  const fastify = build();

  t.teardown(() => {
    fastify.close();
  });

  const response = await fastify.inject({
    method: "GET",
    url: `/weather?lon=${lon}`,
  });

  t.equal(response.statusCode, 400);
});

test('GET "/weather" - Get an error if longitude is not provided', async (t) => {
  const lat = faker.address.latitude();

  const fastify = build();

  t.teardown(() => {
    fastify.close();
  });

  const response = await fastify.inject({
    method: "GET",
    url: `/weather?lat=${lat}`,
  });

  t.equal(response.statusCode, 400);
});

test('GET "/weather" - Get an error if no parameters are provided', async (t) => {
  const fastify = build();

  t.teardown(() => {
    fastify.close();
  });

  const response = await fastify.inject({
    method: "GET",
    url: "/weather",
  });

  t.equal(response.statusCode, 400);
});

test('GET "/weather" - Get an error if the provided latitude is not between -90 and 90', async (t) => {
  const lat = -91;
  const lon = faker.address.longitude();

  const fastify = build();

  t.teardown(() => {
    fastify.close();
  });

  const response = await fastify.inject({
    method: "GET",
    url: `/weather?lat=${lat}&lon=${lon}`,
  });

  t.equal(response.statusCode, 400);
});

test('GET "/weather" - Get an error if the provided longitude is not between -180 and 180', async (t) => {
  const lat = faker.address.latitude();
  const lon = -181;

  const fastify = build();

  t.teardown(() => {
    fastify.close();
  });

  const response = await fastify.inject({
    method: "GET",
    url: `/weather?lat=${lat}&lon=${lon}`,
  });

  t.equal(response.statusCode, 400);
});

test('GET "/weather" - Get an error if latitude or longitude are not numbers', async (t) => {
  const lat = faker.name.firstName();
  const lon = faker.name.firstName();

  const fastify = build();

  t.teardown(() => {
    fastify.close();
  });

  const response = await fastify.inject({
    method: "GET",
    url: `/weather?lat=${lat}&lon=${lon}`,
  });

  t.equal(response.statusCode, 400);
});

test('GET "/weather/rio-cuarto" - Get boolean for Rio Cuarto, Cordoba', async (t) => {
  const fastify = build();

  t.teardown(() => {
    fastify.close();
  });

  const response = await fastify.inject({
    method: "GET",
    url: "/weather/rio-cuarto",
  });

  t.equal(response.statusCode, 200);
  t.type(JSON.parse(response.body), "boolean");
});
