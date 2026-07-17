import { ApiResponse } from "@/types/ApiResponse";
import emailjs from "@emailjs/nodejs";

// emailjs.init({
//   publicKey: process.env.EMAILJS_PUBLIC_KEY || "",
//   privateKey: process.env.EMAILJS_PRIVATE_KEY || "",
// });

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

    const res = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID || "",
      process.env.EMAILJS_TEMPLATE_ID || "",
      mailBody,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY || "",
        privateKey: process.env.EMAILJS_PRIVATE_KEY || "",
      },
    );

    return { success: true, message: res.text || "Verification email sent successfully" };
  } catch (emailError) {
    console.error("error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
