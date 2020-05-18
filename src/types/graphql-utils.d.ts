import { Redis } from "ioredis";
export type TSession = {
  usedId?: string;
};
export type TResolver = (
  parent: any,
  args: any,
  context: { redis: Redis; url: string; session: TSession },
  info: any
) => any;
export interface ResolversMap {
  // this for mutation or Quey or subscribtion
  [key: String]: {
    //this to  of name of query
    //   exammple
    // type Query{
    //      me: User!
    // }
    [key: String]: TResolver;
  };
}
