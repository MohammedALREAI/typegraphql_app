import * as fs from "fs";
import path from "path";
import { GraphQLSchema } from "graphql";
import { importSchema } from "graphql-import"; //WE WE NEED RESOLVER FILE TO RSOLVE
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";

export const GenerateSchemeDefinition =  () => {
  const schemas: GraphQLSchema[] = [];
  const folders: String[] = fs.readdirSync(path.join(__dirname, "../modules"));
  folders.forEach((folder) => {
    const { resolvers } = require(`../modules/${folder}/resolvers`);
    const typeDefs = importSchema(
      path.join(__dirname, `../modules/${folder}/schema.graphql`)
    );
    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });
  return mergeSchemas({ schemas }) as GraphQLSchema;
};
