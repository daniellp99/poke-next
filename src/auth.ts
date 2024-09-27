import NextAuth, { User } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { PASSWORD, USERNAME } from "./constants";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ username, password }) {
        if (username !== USERNAME || password !== PASSWORD) {
          return null;
        }

        return { user: { name: username } } as User;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // initial signin
      if (user && account) {
        token.name = user.name;
        return user as JWT;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        ...token,
      };
    },
  },
});
