import {ValidationError} from 'yup';


 export interface Error{
     path:String
     message:String
}
export const formatYupError=(err:ValidationError)=>{
     const errors: Array<Error> = []

     err.inner.forEach((e:any)=> {
          errors.push({
               path: e.path,
               message:e.message
          })

     });

     return errors;
}

