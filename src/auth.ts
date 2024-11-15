import { prisma } from "@/db";
import { JWT } from "next-auth/jwt";
import authConfig from "@/auth.config";
import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

declare module "next-auth/jwt" {
  interface JWT {
    userid?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      userid: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.userid = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.userid) {
        session.user.id = token.userid as string;
      }
      return session;
    },
  },
});
