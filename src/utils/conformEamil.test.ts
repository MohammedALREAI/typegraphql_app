import { createConfirmEmailUrl } from "./createUrl";
import { createTypeOrmConn } from "./createTypeOrmConnection";
import User from "src/entity/user";
import { Connection } from "typeorm";
import  fetch from "node-fetch";
import { redis } from "./../redis";
let userId: string = "";
let conn: Connection;
beforeAll(async () => {
  conn = await createTypeOrmConn();
  const user = await User.create({
    email: "mhamad.aa1997@gmail.com",
    password: "donetestforyou",
  }).save();
  userId = user.id;
});
afterAll(async () => {
  conn.close();
});

describe("test create eamilconfromaton", async () => {
  test("make soure conform work well", async () => {
    const url = await createConfirmEmailUrl(
      process.env.TEST_HOST as string,
      userId,
      redis
    );
    const res = await fetch(url);
    const text = await res.text();
    expect(text).toEqual("OK");
    const user = await User.findOne({ where: { id: userId } });
    expect((user as User).confirmed).toBeTruthy();
    const chunks = url.split("/");
    const key = chunks[chunks.length - 1];
    const value = await redis.get(key);
    expect(value).toBeNull();
  });
});
