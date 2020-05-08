import { createConnection, getConnectionOptions,ConnectionOptions  } from "typeorm"

export const createTypeOrmConn= async()=>{
     const connectionOptions:ConnectionOptions=await getConnectionOptions(process.env.NODE_ENV);
 return createConnection({...connectionOptions,name="default",})

}
