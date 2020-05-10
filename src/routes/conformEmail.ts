import { NextFunction, Request, Response } from "express";
import User from "src/entity/user";
import { redis } from "src/redis";
export const conformEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const userId = await redis.get(id);
  if (userId) {
    await User.update({ id: userId }, { confirmed: true });
    await redis.del(id);
    res.send("Ok 💔💔");
  }
  res.send("invalid");
  next();
};
