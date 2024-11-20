import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  dbConnect();
  try {
    const { username, code } = await request.json();

    // when we passing data through URL its safe to do this(decoding) as sometimes we get %20 instead of space and all the other things. although in this case we don't need this as we,re extracting from body
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const isCodeMatched = user.verifyCode === code;
    const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeMatched || !isCodeExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json({ success: true, message: "Account Verified Successfully" }, { status: 200 });
    } else if (isCodeExpired) {
      return Response.json({ success: false, message: "Verification code has expired! Please signup again to get a new code" }, { status: 400 });
    } else {
      return Response.json({ success: false, message: "Invalid verification code" }, { status: 400 });
    }
  } catch (error) {
    console.log("error verifying code ", error);
    return Response.json({ success: false, message: "An error occurred while verifying user's code" }, { status: 500 });
  }
}
