import { request } from "graphql-request";
import { User } from "src/entity/user";
import { createTypeOrmConn } from './../../utils/createTypeOrmConnection';
import {
  ERROR_MESSAGE_EMAIL,
  ERROR_MESSAGE_PASSWORD,
} from "../user/Register/ErrorMessages";
import { Connection } from "typeorm";


const mutation = (email: string, password: string) => `
mutation {
     register(data:{email:"${email}",password:${password}}){
          path
          message

     }
}
`;
let con:Connection;
beforeAll(async()=>{
    con= await createTypeOrmConn();
})

afterAll(()=>{
     con.close();
})
// WE NEED TO DROP OF ALL THE DATABASE BEFORE START
describe("should register user", async () => {
  test("check if mail is found", async () => {
    const res = await request(
     process.env.TEST_HOST as string,
      mutation("mhamad.aa@gmail.com", "adminwellgood")
    );
    expect(res).toEqual({ register: null });
    const users: User[] = await User.find({
      where: { email: "mhamad.aa@gmail.com" },
    });
    expect(users).toHaveLength(1);
    expect(users[0].email).toEqual("mhamad.aa@gmail.com");
    expect(users[0].password).not.toEqual("adminwellgood");
  });

  // notvalidEmail

  it("miss length mail", async () => {
    const res2: any = await request(
     process.env.TEST_HOST as string,
      mutation("ma", "dd24d4sd4s24ds")
    );

    expect(res2.register.data).toHaveLength(1);
    expect(res2.register.data[0].path).toEqual({
      path: "email",
      message: ERROR_MESSAGE_EMAIL.EMAIL_NOT_LONG_ENOUGH,
    });
  });

  it("duplication mail and  bad password", async () => {
    const res2: any = await request(process.env.TEST_HOST as string, mutation("test@test.com", "11"));

    // expect(res2.register.data).toHaveLength(1);
    expect(res2.register.data[0]).toEqual([
      {
        path: "email",
        message: ERROR_MESSAGE_EMAIL.DUPLICATION_ERROR,
      },
      {
        path: "password",
        message: ERROR_MESSAGE_PASSWORD.PASSWORD_NOT_LONG_ENOUGH,
      },
    ]);
  });
  it(" mail is not long and  fine password", async () => {
    const res3: any = await request(process.env.TEST_HOST as string, mutation("com", "ddcdcdfdf"));

    // expect(res2.register.data).toHaveLength(1);
    expect(res3.register.data[0]).toEqual([
      {
        path: "email",
        message: ERROR_MESSAGE_EMAIL.EMAIL_NOT_LONG_ENOUGH,
      },
    ]);
  });
});
