let username = document.getElementById("username") as HTMLInputElement;
let email = document.getElementById("email") as HTMLInputElement;
let password = document.getElementById("password") as HTMLInputElement;
let confirm_password = document.getElementById(
  "confirmPassword"
) as HTMLInputElement;

let reg_form = document.getElementById("registration-form") as HTMLFormElement;

reg_form.addEventListener("submit", (event) => {
  event.preventDefault();

  let userName = username.value;
  let userEmail = email.value;

  let pass = password.value;
  let confirm_pass = confirm_password.value;

  let state =
    userName.trim() != "" &&
    userEmail.trim() != "" &&
    pass.trim() != "" &&
    confirm_pass.trim() != "";

  if (state) {
    if (pass == confirm_pass) {
      const promise = new Promise<{ error: string; message: string }>(
        (resolve, reject) => {
          fetch("http://localhost:3550/user/register", {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              username: userName,
              email: userEmail,

              password: pass,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              //   gotoLogin();
              resolve(data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      );

      function gotoLogin() {
        location.href = "../pages/sign-in.html";
      }
    } else {
      console.log("Password mismatch");
    }
  }
});
