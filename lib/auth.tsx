import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: "868697171484-ckfks66jkpa4keniud70c50d8b1or4bk.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },

    async session({ session, token, user }: any) {
      session.id_token = token.id_token as string;
      return session;
    },
  },
};