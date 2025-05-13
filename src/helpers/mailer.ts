import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Generate token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        // Update user with token
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        // Create transporter with Gmail
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "2ddbd359690458",
                pass: "b1b27dc18991e9"
            }
        });

        // Verify transporter
        await transport.verify();

        const mailOptions = {
            from: "2ddbd359690458",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                    <h2>${emailType === "VERIFY" ? "Email Verification" : "Password Reset"}</h2>
                    <p>Please click the button below to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}:</p>
                    <a href="${process.env.DOMAIN}/verify?token=${hashedToken}" 
                       style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0;">
                        ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
                    </a>
                    <p>If the button doesn't work, copy and paste this link into your browser:</p>
                    <p>${process.env.DOMAIN}/verify?token=${hashedToken}</p>
                    <p>This link will expire in 1 hour.</p>
                </div>
            `
        };

        const mailResponse = await transport.sendMail(mailOptions);
        console.log("Email sent successfully:", mailResponse.messageId);
        return mailResponse;

    } catch (error: any) {
        console.error("Error sending email:", error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}
