import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !user) {
    return Response.json({ success: false, message: "Not Authenticated" }, { status: 401 });
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, { isAcceptingMessage: acceptMessages }, { new: true });

    if (!updatedUser) {
      return Response.json({ success: false, message: "failed to update user status to accept messages" }, { status: 500 });
    }

    return Response.json({ success: true, message: "Message acceptance status updated successfully!", updatedUser }, { status: 200 });
  } catch (error) {
    console.log("failed to update user status to accept messages ", error);
    return Response.json({ success: false, message: "failed to update user status to accept messages" }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !user) {
    return Response.json({ success: false, message: "Not Authenticated" }, { status: 401 });
  }

  const userId = user._id;
  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }
    return Response.json({ success: true, isAcceptingMessages: foundUser?.isAcceptingMessage }, { status: 200 });
  } catch (error) {
    console.log("error in getting user's message acceptance status ", error);
    return Response.json({ success: false, message: "failed to update user status to accept messages" }, { status: 500 });
  }
}
