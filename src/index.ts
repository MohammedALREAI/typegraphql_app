import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";

@Resolver()
class FirstResolver {
  @Query(() => String,{name:"hewooword"})
  async hallow() {
    return "await";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [FirstResolver]
  });

  const apolloServer = new ApolloServer({ schema });
  const app = Express();
  apolloServer.applyMiddleware({ app });
  app.listen(4000,() => {
    console.log(` 🐱‍🏍🐱‍🏍🎉🎉the server run in the port 4000`);
  });
};
main();
