import { TResolver } from "src/types/graphql-utils"





export default async(resolver:TResolver,parent:any,
     args:any,
     context:any,
     info:any
     )=>{
          const result=await resolver(parent,args,context,info);
          return result;
     }

