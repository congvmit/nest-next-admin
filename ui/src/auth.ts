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
        let result = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: "http://localhost:8081/api/v1/auth/signin",
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
    }
    // authorized: async ({ auth }) => {
    //   // Logged in users are authenticated, otherwise redirect to login page
    //   return !!auth;
    // },
    // async authorized({ request, auth }) {
    //   const token = auth?.user?.access_token;
    //   const pathname = request.url;
    //   console.log("pathname ", pathname);

    //   if (token) return true;
    //   // if (pathname === "http://localhost:3000/api/login") return true;
    //   if (pathname.endsWith("/api/login")) return true;

    //   return false;
    // },
  },
});
