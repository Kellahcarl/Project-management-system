document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form") as HTMLFormElement;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    const emailError = document.getElementById("emailError") as HTMLSpanElement;
    const passwordError = document.getElementById(
      "passwordError"
    ) as HTMLSpanElement;

    const ApiMessageBox = document.getElementById(
      "APImessage"
    ) as HTMLSpanElement;

    // Clear any previous error messages

    emailError.textContent = "";
    passwordError.textContent = "";

    ApiMessageBox.textContent = "";

    // Validation logic (you can customize this)

    if (email.value.trim() === "") {
      emailError.textContent = "Email is required";
      return;
    }

    if (password.value.trim() === "") {
      passwordError.textContent = "Password is required";
      return;
    }

    // Form data is valid, create the user object
    const userData = {
      email: email.value,
      password: password.value,
    };

    const promise = new Promise<{
      error: string;
      message: string;
      token?: string;
    }>((resolve, reject) => {
      fetch("http://localhost:3550/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.token);

          if ("message" in data) {
            ApiMessageBox.classList.remove("text-danger");
            ApiMessageBox.classList.add("text-success");
            ApiMessageBox.textContent = data.message;
          }
          if ("error" in data) {
            ApiMessageBox.classList.remove("text-success");
            ApiMessageBox.classList.add("text-danger");
            ApiMessageBox.textContent = data.error;
          }

          setTimeout(() => {
            redirect();

            resolve(data);
          }, 2000);

          console.log(data);
        })
        .catch((error) => {
          console.log(error);
          location.href = "../pages/login.html";
          reject(error);
        });
    });
    function redirect() {
      const token = localStorage.getItem("token") as string;

      new Promise<{
        info: {
          id?: string;
          isAdmin?: boolean;
          username?: string;
          email?: string;
        };
      }>((resolve, reject) => {
        fetch("http://localhost:3550/user/check_user_details", {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            token: token,
          },
          method: "GET",
        })
          .then((res) => {
            // console.log(res);

            resolve(res.json());
          })
          .catch((error) => {
            reject(error);
          });
      }).then((data) => {
        console.log(data["info"]);

        if (data["info"].isAdmin === true) {
          localStorage.setItem("user_email", data["info"].email!);
          location.href = "../pages/admin.html";
        } else if (data["info"].isAdmin === false) {
          localStorage.setItem("user_email", data["info"].email!);
          location.href = "../pages/user.html";
        }
      });
    }
  });
});
