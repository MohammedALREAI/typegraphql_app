import { v4 } from "uuid";
import { redis } from "src/redis";
import  Redis   from "ioredis";
export const createConfirmEmailUrl = async (
  url: string,
  userID: string,
  redis: Redis.Redis
) => {
  const id = v4();
  await redis.set(id, userID, "ex", 60 * 60 * 24);
  return `${url}/conform/${id}`;
};
