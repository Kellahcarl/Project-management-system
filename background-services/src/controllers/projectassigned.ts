import ejs from "ejs";
import nodemailer from "nodemailer";
import { query } from "../services/dbconnect";

interface User {
  _id: string;
  email: string;
}

interface Project {
  name: string;
  description: string;
  
}

export const sendProjectAssignedEmail = async (
  userId: string,
  project: Project
) => {
  try {
    
    const user: User = await query("SELECT * FROM users WHERE _id = ?", [
      userId,
    ]);

    if (!user) {
      console.log(`User with ID ${userId} not found.`);
      return;
    }

    const transporter = nodemailer.createTransport({
    
    });

    
    const emailHTML = await ejs.renderFile(
      "../templates/projectAssignedEmail.ejs",
      {
        user: user,
        project: project,
      }
    );

    
    const mailOptions = {
      from: "Your App Name <your@email.com>",
      to: user.email,
      subject: "You've been assigned a new project",
      html: emailHTML,
    };

    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Project assigned email sent: ", info.response);
      }
    });
  } catch (error) {
    console.error("Error sending project assigned email: ", error);
  }
};
