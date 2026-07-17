import { ApiResponse } from "@/types/ApiResponse";
import emailjs from "@emailjs/browser";

emailjs.init(process.env.EMAILJS_PUBLIC_KEY || "");

export async function sendVerificationEmail(
  email: string,
  username: string,
  passcode: string,
): Promise<ApiResponse> {
  try {
    const mailBody = {
      email, // receiver
      user: username,
      passcode, // verification code
    };

    emailjs
      .send(process.env.EMAILJS_SERVICE_ID || "", process.env.EMAILJS_TEMPLATE_ID || "", mailBody)
      .then((res) => console.log("email sent. res=> ", res))
      .catch((error) => console.log("error sending email ", error));

    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.error("error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
