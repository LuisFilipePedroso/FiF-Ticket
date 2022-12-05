import NextAuth, { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID_V2 ?? "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET_V2 ?? "",
      version: "2.0",
      authorization: {
        url: "https://twitter.com/i/oauth2/authorize",
        params: {
          scope: "users.read tweet.read offline.access tweet.write",
        },
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      // @ts-ignore
      session.id = token.sub;
      // @ts-ignore
      session.access_token = token.access_token;
      // @ts-ignore
      session.user.username = token.username;

      return session;
    },
    async jwt({ token, account, profile }) {
      if (profile != undefined) {
        const { data }: any = profile;
        const { username } = data;
        token.username = username as string;
      }
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
