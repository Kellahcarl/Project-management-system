import nodemailer from "nodemailer";

export const sendEmailCompletedNotification = async (
  adminEmail: string,
  recipientEmail: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      // Configure your email service and credentials here
    });

    // Prepare the email message
    const mailOptions = {
      from: "Your App Name <your@email.com>",
      to: adminEmail,
      subject: "Email Completion Notification",
      text: `An email to ${recipientEmail} has been successfully sent.`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email notification: ", error);
      } else {
        console.log("Email completion notification sent: ", info.response);
      }
    });
  } catch (error) {
    console.error("Error sending email completion notification: ", error);
  }
};
