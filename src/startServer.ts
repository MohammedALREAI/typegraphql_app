import { GraphQLServer } from "Graphql-yoga";
import { createTypeOrmConn } from "./utils/createTypeOrmConnection";
import { conformEmail } from "./routes/conformEmail";
import { GenerateSchemeDefinition } from './utils/genarateScharma';
import { redis } from './redis';

// yarn add -D @gql2ts/from-schema
// yarn add sparkpost with type

export const startServer = async () => {


  const server: GraphQLServer = new GraphQLServer({
       schema: GenerateSchemeDefinition(),
    context: ({ request }) => ({
      redis,
      url: `request.protocol://${request.get("host")}`,
    }),
  });
  // we need to create ontother endpoin to conform/email

  server.express.get("/conform/:id", conformEmail);

  await createTypeOrmConn();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  return app;
};
