
import { request } from 'graphql-request';
import { ERROR_MESSAGE_EMAIL } from 'src/modules/user/Register/ErrorMessages';
import { string } from 'yup';
import { User } from 'src/entity/user';



const mutationLogin=(data:) => `
mutation{
     login(data:{email:"${data.email}",password:"${data.password}"}){
          path
          message
     }
}
`;




const login_done=async( e: string, p: string,EM:string,PH:string)=>{
     const _data={
          data:{
          e,
          p
     }}
              const res= await request(process.env.HOST as string,mutationLogin(_data));
              expect(res).toEqual([{
                   login:{
                        path:PH,
                        message:EM
                   }
              }])



}
describe('login handle application', () => {
     test('should  email is not found', async() => {
          return await login_done("test@test.com", "dsdxxxdsd","email",ERROR_MESSAGE_EMAIL.EMAIL_NOT_FOUND);

     })
     test('email not conforms', async() => {
          return await login_done("test@test.com", "dsdxxxdsd", "email", ERROR_MESSAGE_EMAIL.EMAIL_NOT_FOUND);
     })


     test('email not conforms', async () => {
          return await login_done("test@test.com", "HJHKJHH", "paa", ERROR_MESSAGE_EMAIL.EMAIL_NOT_FOUND);
     })
     test('email consformed  ', async () => {

          return await login_done("test@test.com", "HJHKJHH", "paa", "");
          await User.updute({ confirmed: true }, { where: { email:"test@test.com" }})



     })



})

