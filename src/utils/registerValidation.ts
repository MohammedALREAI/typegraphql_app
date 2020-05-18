import * as yup from "yup";
import { ERROR_MESSAGE_EMAIL, ERROR_MESSAGE_PASSWORD } from "src/modules/user/Register/ErrorMessages";

export const schemaValidationRegister = yup.object().shape({
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
