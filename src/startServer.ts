import { GraphQLServer } from 'Graphql-yoga';
import * as path from 'path';
import { importSchema } from 'graphql-import';//WE WE NEED RESOLVER FILE TO RSOLVE DATA
//THIS TO IMPORT SCHEMA FORM THE FILE LOCATION

import { createTypeOrmConn } from './utils/createTypeOrmConnection';

import * as fs from 'fs'

import { GraphQLSchema } from 'graphql';
import { mergeSchemas,makeExecutableSchema} from'graphql-tools'

export const startServer = async () => {

     const schemas:GraphQLSchema[]=[];
     const folders:String[]=fs.readdirSync(path.join(__dirname,"/src/modules"));
     folders.forEach(folder=>{
          const {resolvers}=require(`./modules/${folder}/resolvers`);
          const typeDefs=importSchema(path.join(__dirname, `./modules/${folder}/schema.graphql`));
     schemas.push(makeExecutableSchema({resolvers,typeDefs}));
     })

     const server:GraphQLServer = new GraphQLServer({schema:mergeSchemas(schemas)});
     await createTypeOrmConn();
     const app = await server.start({ port: process.env.NODE_ENV === "test" ? 0 : 4000 });
   return  app;

};


