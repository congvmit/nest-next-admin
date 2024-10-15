import { AuthError, CredentialsSignin } from "next-auth";

export class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials";
}

export class InactiveAccountError extends CredentialsSignin {
  code = "inactive_account";
}
