import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(email: string, username: string, verifyCode: string): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      // to: ['delivered@resend.dev'],
      to: email,
      subject: "Mystery Message | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    if (error) {
      return { success: false, message: "Failed to send verification email" };
    }

    console.log("Response data after sending email=> ", data);

    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.error("error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
