import ejs from "ejs";

import { sendMail } from "../services/email";
import { query } from "../services/dbconnect";

interface User {
  _id: string;
  first: string;
  email: string;
}

interface Item {
  user_id: string;
  active: boolean;
  id: string;
}

export const Registration_run = async () => {
  const items.recordset = await query(
    "SELECT * from dbo.registrationQueue where active = 1"
  );

  for (let item:item of items) {
    let user = await query(
      "SELECT * from dbo.users where _id = '" + item.user_id + "'"
    );
    user = user[0];
    ejs.renderFile(
      "../templates/registerEmail.ejs",
      { name: user.first, email: user.email, password: "password" },
      async (err: Error, data: string) => {
        if (err) return console.log(err);
        const message = {
          from: {
            name: "User System",
            address: process.env.FROM_EMAIL,
          },
          to: user.email,
          subject: "Registration Success",
          html: data,
        };
        try {
          if (item.active) {
            await sendMail(message);
            await query(
              "UPDATE dbo.registrationQueue set active = 0 where id = '" +
                item.id +
                "'"
            );
            console.log(`Registration Email sent to ${user.email}`);
          }
        } catch (error) {
          console.log((error as Error).message);
          console.log(`Couldn't send email to ${user.email}`);
        }
      }
    );
  }
};
