import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        dbConnect();
        try {
          const user = await UserModel.findOne({ $or: [{ email: credentials?.identifier }, { username: credentials?.identifier }] });

          if (!user) {
            throw new Error("No user found with this credentials");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account first!");
          }

          const isPassCorrect = await compare(credentials?.password, user.password);
          if (!isPassCorrect) {
            throw new Error("Invalid Credentials");
          }
          return user;
        } catch (error) {
          // If you return null then an error will be displayed advising the user to check their details.
          // return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          console.log(error);
          if (error instanceof Error) throw new Error(error?.message);
        }
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token._id = user?._id;
  //       token.isVerified = user.isVerified;
  //       token.isAcceptingMessages = user.isAcceptingMessages;
  //       token.username = user.username;
  //     }
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     if (token) {
  //       session.user._id = token._id;
  //       session.user.isVerified = token.isVerified;
  //       session.user.isAcceptingMessages = token.isAcceptingMessages;
  //       session.user.username = token.username;
  //     }
  //     return session;
  //   },
  // },
  // session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  // secret: process.env.NEXTAUTH_SECRET,
  // pages: { signIn: "/sign-in" },
};
