import { conformEmail } from "./../../routes/conformEmail";
import * as session from "express-session";
import { GraphQLServer } from 'Graphql-yoga';
import * as connectRedis from 'connect-redis'

const RedisStore = connectRedis(session);
export const middleware = (server: GraphQLServer) => {
  server.express.get("/conform/:id", conformEmail);
  server.express.use(
    session({
      name: "used_id",
         store: new RedisStore({})
      secret: process.env.SECRET_SESSION as string,
      resave: false,
      saveUnitialized: false,
      cookie: {
        httpOnly: true,
        secure:process.env.NODE_ENV==="production",
        maxAge:1000*60*60*24*7
      },
    })
  );
};
