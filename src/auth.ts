import NextAuth, { User } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { PASSWORD, USERNAME } from "./constants";

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

        return { username } as User;
      },
    }),
  ],
});
