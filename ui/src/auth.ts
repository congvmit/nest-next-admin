import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { InactiveAccountError, InvalidCredentialsError } from "@/utils/errors";
import { sendRequest } from "./utils/api";
import { IUser } from "./types/next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        let result = await sendRequest<IBackendRes<ISignIn>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/signin`,
          body: {
            email: credentials.email,
            password: credentials.password,
          },
        });
        if (+result.statusCode === 201 || +result.statusCode === 200) {
          return {
            _id: result?.data?.user?._id,
            name: result?.data?.user?.name,
            email: result?.data?.user?.email,
            access_token: result?.data?.access_token,
          };
        } else if (+result.statusCode === 403) {
          throw new InactiveAccountError("Inactive account");
        } else if (+result.statusCode === 401) {
          throw new InvalidCredentialsError("Invalid credentials");
        } else {
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as IUser;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },
    // authorized: async ({ auth }) => {
    //   // Logged in users are authenticated, otherwise redirect to login page
    //   return !!auth;
    // },
  },
});
