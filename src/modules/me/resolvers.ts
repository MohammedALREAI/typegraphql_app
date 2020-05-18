import User from'../../entity/user';
import { ResolversMap } from 'type-graphql';




export const resolvers: ResolversMap = {
  Query: {
    me: (_,__,{session}) => {
         User.findOne({
         where:{
              id:session.userId
         }
         })
    }
  },



};
