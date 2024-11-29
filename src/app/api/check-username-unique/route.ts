import dbConnect from "@/lib/dbConnect";
import { z } from "zod";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";

const userNameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = { username: searchParams.get("username") };

    //Validate with zod
    const result = userNameQuerySchema.safeParse(queryParam);
    console.log(result); //TODO: remove
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: usernameErrors?.length > 0 ? usernameErrors.join(", ") : "invalid query parameters.",
        },
        { status: 400 }
      );
    }

    const { username } = result?.data;

    // with case-insensitive enabled
    const existingVerifiedUser = await UserModel.findOne({ username: { $regex: new RegExp(`^${username}$`, "i") }, isVerified: true });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username already taken and verified.",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is available.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error checking username ", error);
    return Response.json({ success: false, message: "An error occurred while checking username." }, { status: 500 });
  }
}
