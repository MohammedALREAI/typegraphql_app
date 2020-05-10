import Sparkpost from'sparkpost'
const client =new Sparkpost(process.env.KEY_SPARKPOST as string)

export const sendEmail=async(recipient:string,url:string)=>{

client.tra
}


