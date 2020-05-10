import { Redis } from "ioredis";
export interface ResolversMap {
  [key: String]: {
    [key: String]: (
      parent: any,
      args: any,
      context: { redis: Redis; url: string },
      info: any
    ) => any;
  };
}
