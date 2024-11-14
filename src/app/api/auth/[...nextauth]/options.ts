import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

type CredentialsTypes = {
  email: { label: string; type: string };
  password: { label: string; type: string };
};

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
          const user = await UserModel.findOne({ $or: [{ email: credentials?.email }, { username: credentials?.username }] });

          if (!user) {
            throw new Error("No user found with this email");
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
          throw new Error("Invalid Credentials");
        }
      },
    }),
  ],
};
