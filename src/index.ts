import cors from "@fastify/cors";
import fastifyEnv from "@fastify/env";
import helmet from "@fastify/helmet";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify, { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import Env from "./env";

const build = async () => {
  console.log("Starting server...", process.env.NODE_ENV);

  const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify(
    {
      logger: true,
    },
  );

  await app.register(fastifyEnv, {
    dotenv: true,
    schema: {
      type: "object",
      properties: {
        NODE_ENV: {
          type: "string",
        },
        PORT: {
          type: "number",
        },
      },
    },
  });

  app.register(cors, {
    origin: "*",
  });

  app.register(helmet);

  app.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "StudyBean API",
        description: "StudyBean API",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Local server",
        },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: "apiKey",
            name: "apiKey",
            in: "header",
          },
        },
      },
    },
  });

  app.register(swaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  return app;
};

const start = async (app: FastifyInstance) => {
  const env = app.getEnvs<Env>();
  const isProd = env.NODE_ENV == "production";
  await app.listen({
    port: env.PORT,
    host: isProd ? "0.0.0.0" : "localhost",
  });
};

build()
  .then((server) => start(server))
  .catch((err) => {
    console.log("Error starting server: ", err);
  });
