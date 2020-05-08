
import { ResolversMap } from '../../types/graphql-utils';

export const resolvers:ResolversMap={


Query: {

          hello:(_:any, {name}:any) => `BY ${name} `
     }
}
