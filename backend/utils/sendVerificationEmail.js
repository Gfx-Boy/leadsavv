// utils/sendVerificationEmail.js
import nodemailer from 'nodemailer';

// Export the sendVerificationEmail function using named export
export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    // Setup transporter (Mailtrap for testing purposes)
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      auth: {
        user: 'info@solvevare.com',
        pass: '@Solvevare2024',
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'info@solvevare.com',
      to: email,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Verification code sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
