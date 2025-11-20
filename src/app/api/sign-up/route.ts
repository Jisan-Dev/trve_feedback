import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already taken and verified",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "This Email is already registered and verified",
          },
          { status: 400 }
        );
      } else {
        const hashedPass = await hash(password, 10);
        existingUserByEmail.password = hashedPass;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); //same as getHours() + 1
        existingUserByEmail.username = username;
        await existingUserByEmail.save();
      }
    } else {
      const hashedPass = await hash(password, 10);
      const expiryDate = new Date();
      // expiryDate.setMinutes(expiryDate.getMinutes() + 1);
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPass,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    const subject = "Verification Code from TrveFeedback";
    const emailResponse = await sendVerificationEmail(
      email,
      existingUserByEmail ? existingUserByEmail.username : username,
      verifyCode,
      subject
    );
    console.log("emailRes=> ", emailResponse);

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse?.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message:
          "User registered and verification code sent to your email! Please verify now, it will expire in 1 hour!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
