# Lucas Paviotti Technical Interview

Este proyecto fue creado utilizando [Fastify](https://www.fastify.io/) y Typescript

## Setup

* Agregar la API key de [openweathermap](https://home.openweathermap.org/api_keys) en un archivo `.env` con el nombre `OPENWEATHERMAPAPPID`.
* Ejecutar `npm run build` para compilar typescript, y luego iniciar el servidor con [Nodemon](https://www.npmjs.com/package/nodemon) usando `npm run dev` o bien, el servidor usando Node con `npm start`.

## Funcionamiento

Usando la ruta `/weather/rio-cuarto` conseguimos un valor booleano como pide la consigna. En caso de ser mayor a 15 grados obtenemos `true`, al ser menor `false`.

También se puede consultar cualquier otra ciudad usando las coordenadas de la siguiente forma: `/weather?lat=-33.1229869&lon=-64.3477571`

## Tests

Los tests utilizan [node-tap](https://node-tap.org/) y se encuentran en los archivos `src/app.test.ts` y `src/routes/weather.test.ts`

## Cache Plugin

La implementación del plugin de cache está dentro de la carpeta plugins en src