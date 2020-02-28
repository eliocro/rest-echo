'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: 'localhost',
  });

  server.route({
    method: '*',
    path: '/{path*}',
    handler: request => {
      const {
        method, path, query, payload, headers, auth, info,
      } = request;

      return {
        method, path, query, payload, headers, auth, info,
      };
    },
  });

  await server.start();
  console.log('Echo running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
