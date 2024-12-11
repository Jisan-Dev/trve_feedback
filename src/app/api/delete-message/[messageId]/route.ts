import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/User";

export async function DELETE(request: Request, { params }: { params: any }) {
  //  await params();
  const { messageId } = await params;
  console.log("msgId", messageId);
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !user) {
    return Response.json({ success: false, message: "Not Authenticated" }, { status: 401 });
  }

  try {
    const updateResult = await UserModel.updateOne({ _id: user._id }, { $pull: { messages: { _id: messageId } } });

    if (updateResult.modifiedCount === 0) {
      return Response.json({ success: false, message: "Message not found or already deleted" }, { status: 404 });
    }

    return Response.json({ message: "Message deleted", success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting message:", error);
    return Response.json({ message: "Error deleting message", success: false }, { status: 500 });
  }
}
