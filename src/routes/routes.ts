import { FastifyInstance } from "fastify";
import centerRoutes from "./center/center.route";
import classRoutes from "./class/class.route";
import meRoutes from "./me/me_routes";
import userRoutes from "./user/user.route";

async function routes(fastify: FastifyInstance, opts: any) {
  fastify.register(meRoutes, { prefix: "/me" });
  fastify.register(centerRoutes, { prefix: "/center" });
  fastify.register(userRoutes, { prefix: "/user" });
  fastify.register(classRoutes, { prefix: "/class" });
}

export default routes;
