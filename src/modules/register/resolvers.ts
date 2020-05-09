import * as bcrypt from "bcryptjs";
import { User } from "src/entity/user";
import { ResolversMap } from "./../../types/graphql-utils.d";
import { MessageError } from "./../../utils/MessageError";
import {
  ERROR_MESSAGE_EMAIL,
  ERROR_MESSAGE_PASSWORD,
} from "../user/Register/ErrorMessages";
import * as yup from "yup";

import { formatYupError } from "src/utils/YupValidation";

// interface InputArgsRegister{
//      data:{
//           email:String,
//           password:String
//      }

// }

const schemaValidationRegister = yup.object().shape({
  email: yup
    .string()
    .email(ERROR_MESSAGE_EMAIL.FORMAT_SHOULD_BE_MAIL)
    .min(7, ERROR_MESSAGE_EMAIL.EMAIL_NOT_LONG_ENOUGH)
    .max(255, ERROR_MESSAGE_EMAIL.EMAIL_NOT_LONG_ENOUGH)
    .required(),
  password: yup
    .string()
    .min(6, ERROR_MESSAGE_PASSWORD.PASSWORD_NOT_LONG_ENOUGH)
    .max(30, ERROR_MESSAGE_PASSWORD.PASSWORD_NOT_LONG_ENOUGH)
    .required(),
});
export const resolvers: ResolversMap = {
  Query: {
    by: () => "bay🙌",
  },

  Mutation: {
    register: async (_: any, args: GQL.IRegisterOnMutationArguments) => {
            let { email, password }:any= args.data;
      email = email.toLowerCase();

      try {
        await schemaValidationRegister.validate(
          { email, password },
          { abortEarly: false }
        );
      } catch (error) {
        return formatYupError(error);
      }

      //  check if mail is found
      const isMail = await User.findOne({ where: { email }, select: ["id"] });
      if (!isMail) {
        return [
          {
            path: "email",
            messages: ERROR_MESSAGE_EMAIL.DUPLICATION_ERROR,
          },
        ];
      }

      const hashPassword = await bcrypt.hash(password, 20);
      await User.create({
        email,
        password: hashPassword,
      }).save();

      return null;
    },
  },
};
