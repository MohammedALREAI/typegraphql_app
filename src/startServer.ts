import { GraphQLServer } from "Graphql-yoga";
import { createTypeOrmConn } from "./utils/createTypeOrmConnection";
import { conformEmail } from "./routes/conformEmail";
import { GenerateSchemeDefinition } from "./utils/genarateScharma";
import { redis } from "./redis";
import { GraphQLSchema } from "graphql";
import { middleware } from "./modules/middelware/index";

// yarn add -D @gql2ts/from-schema @type/connect-redis
// yarn add sparkpost with type
// yarn add connect-redis

const schema:any=GenerateSchemeDefinition();
export const startServer = async () => {
  const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({
      redis,
      url: `request.protocol://${request.get("host")}`,
      session: request.session,
    }),
  });
  // we need to create ontother endpoin to conform/email
  middleware(server);
  const cors = {
    credentials: true,
    origin: "http://localhost:3000",
  };

  await createTypeOrmConn();
  const app = await server.start({
    cors,
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  return app;
};
