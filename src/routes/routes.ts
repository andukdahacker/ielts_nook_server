import { FastifyInstance } from "fastify";
import centerRoutes from "./center/center.route";
import { CenterSchema } from "./center/schema/center.schema";
import meRoutes from "./me/me_routes";
import { UserRoleSchema, UserSchema } from "./user/schema/user.schema";
import userRoutes from "./user/user.route";

async function routes(fastify: FastifyInstance, opts: any) {
  fastify.addSchema(UserRoleSchema);
  fastify.addSchema(UserSchema);
  fastify.addSchema(CenterSchema);
  fastify.register(meRoutes, { prefix: "/me" });
  fastify.register(centerRoutes, { prefix: "/center" });
  fastify.register(userRoutes, { prefix: "/user" });
}

export default routes;
