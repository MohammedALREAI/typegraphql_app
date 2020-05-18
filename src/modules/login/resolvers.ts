import * as bcrypt from "bcryptjs";
import User from "../../entity/user";

import * as yup from "yup";
import { redis } from "./../../redis";

import { formatYupError } from "src/utils/YupValidation";
import { sendEmail } from "./../../utils/sendMail";
import { ResolversMap } from "./../../types/graphql-utils.d";
import { schemaValidationRegister } from "./../../utils/registerValidation";
import {
  ERROR_MESSAGE_EMAIL,
  ERROR_MESSAGE_PASSWORD,
} from "src/modules/user/Register/ErrorMessages";

export const resolvers: ResolversMap = {
  Query: {
    by2: () => "bay🙌",
  },

  Mutation: {
    login: async (_: any, args: GQL.ILoginOnMutationArguments,
     { session }) =>
      //  { redis, url }
      {
        let { email, password } = args.data;
        //seache in the eamil

        email = email.toLowerCase();
        const user = await User.findOne({
          where: {
            email,
          },
        });
        if (!user) {
          return [
            {
              path: "email",
              message: ERROR_MESSAGE_EMAIL.EMAIL_NOT_FOUND,
            },
          ];
        }
        //WE NEED TO DECRIBT PASSWORD
        const valid: boolean = await bcrypt.compare(password, user.password);
        if (!valid) {
          return [
            {
              path: "password",
              message: ERROR_MESSAGE_PASSWORD.PASSWORD_NOT_MATCH,
            },
          ];
        }
        // login sucess
        if(!req.session.userId){
          throw new Error("user have error in session")

        }
        session.userId=user.id

        


        return null;
      },
  },
};
