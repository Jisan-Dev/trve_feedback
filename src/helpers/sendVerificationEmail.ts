import { ApiResponse } from "@/types/ApiResponse";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
  subject: string,
): Promise<ApiResponse> {
  try {
    const mailBody = {
      to: email, // receiver or list of [receivers]
      from: {
        name: "True Feedback",
        email: "istiakjisan696@gmail.com",
      },
      subject: subject,
      text: `Verification Code for ${username} is ${verifyCode}`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Verification Code for ${username}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: auto; padding: 20px; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px;">
              <h2 style="color: #222222; text-align: center; margin-bottom: 20px;">TrveFeedback Verification Code</h2>
              <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                  Hello ${username},
              </p>
              <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                  Thank you for signing up with TrveFeedback! To complete your account setup, please use the following verification code:
              </p>
              <div style="text-align: center; margin: 20px 0;">
                  <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #007bff; border: 2px dashed #007bff; padding: 10px 20px; border-radius: 8px;">
                      ${verifyCode}
                  </span>
              </div>
              <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                  You can click the button below to verify your account:
              </p>
              <div style="text-align: center; margin: 20px 0;">
                  <a href="https://trve-feedback.vercel.app/verify/${username}/${verifyCode}"
                     style="text-decoration: none; background-color: #007bff; color: #ffffff; font-size: 16px; font-weight: bold; padding: 12px 24px; border-radius: 8px; display: inline-block;">
                      Verify Here
                  </a>
              </div>
              <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                  Please enter this code on the verification page within the next 15 minutes. If you did not request this code, please ignore this email.
              </p>
              <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                  Best regards, <br>
                  The TrveFeedback Team
              </p>
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;">
              <p style="color: #999999; font-size: 14px; line-height: 1.5; text-align: center;">
                  This email was sent to you because you signed up for TrveFeedback. If this wasn't you, please contact our support team immediately.
              </p>
          </div>
      </body>
      </html>
      `,
    };

    sgMail
      .send(mailBody)
      .then((res) => console.log("email sent. res=> ", res))
      .catch((error) => console.log("error sending email ", error));

    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.error("error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
