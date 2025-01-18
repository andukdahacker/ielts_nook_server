import { FastifyInstance } from "fastify";
import centerRoutes from "./center/center.route";
import meRoutes from "./me/me_routes";
import userRoutes from "./user/user.route";

async function routes(fastify: FastifyInstance, opts: any) {
  fastify.register(meRoutes, { prefix: "/me" });
  fastify.register(centerRoutes, { prefix: "/center" });
  fastify.register(userRoutes, { prefix: "/user" });
}

export default routes;
