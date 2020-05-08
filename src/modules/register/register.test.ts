import { request } from 'graphql-request';
import { startServer } from 'src/startServer';
import { User } from 'src/entity/user';
import { ERROR_MESSAGE_EMAIL } from '../user/Register/ErrorMessages';
enum UserTest {
     email="test@test.com",
     password="test@test"

}
let getHost = ()=> ""

const mutation=(email:string,password:string)=>`
mutation {
     register(data:{email:"${email}",password:${password}}){
          path
          message

     }
}
`
beforeAll(async()=>{

    const app= await startServer();
    const { port }:any = app.address();
    getHost=()=>`http://127.0.0.1:${port}`

})
// WE NEED TO DROP OF ALL THE DATABASE BEFORE START
test('should register user', async() => {
     const res=await request(getHost(),mutation("test@test.com","test@test.com"  ));
     expect(res).toEqual({register:null});
     const users:User[]=await User.find({where:{email:UserTest.email}})
     expect(users).toHaveLength(1);
     expect(users[0].email).toEqual(UserTest.email)
     expect(users[0].password).not.toEqual(UserTest.password);

     // notvalidEmail

     const res2:any=await request(getHost(),mutation("ma","dd24d4sd4s24ds"));

     expect(res2.register.data).toHaveLength(1);


     expect(res2.register.data[0].path).toEqual({
          path:"email",
          message:ERROR_MESSAGE_EMAIL.EMAIL_NOT_LONG_ENOUGH

     });
     expect(res2.register.data[0].message).toEqual(ERROR_MESSAGE_EMAIL.DUPLICATION_ERROR);

///not mail



// not main and max


// not empty





     // expect(res2.register).toEqual({
     //      register:[{
     //        path:'email',
     //        message:ERROR_MESSAGE_EMAIL.DUPLICATION_ERROR
     //      }]
     // })



})

