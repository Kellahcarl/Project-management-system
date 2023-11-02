document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById(
    "registration-form"
  ) as HTMLFormElement;

  registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const confirmPassword = document.getElementById(
      "confirmPassword"
    ) as HTMLInputElement;

    const usernameError = document.getElementById(
      "usernameError"
    ) as HTMLSpanElement;
    const emailError = document.getElementById("emailError") as HTMLSpanElement;
    const passwordError = document.getElementById(
      "passwordError"
    ) as HTMLSpanElement;
    const confirmPasswordError = document.getElementById(
      "confirmPasswordError"
    ) as HTMLSpanElement;
    const ApiMessageBox = document.getElementById(
      "APImessage"
    ) as HTMLSpanElement;

    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    ApiMessageBox.textContent = "";

    if (username.value.trim() === "") {
      usernameError.textContent = "Username is required";
      return;
    }

    if (email.value.trim() === "") {
      emailError.textContent = "Email is required";
      return;
    }

    if (password.value.trim() === "") {
      passwordError.textContent = "Password is required";
      return;
    }

    if (password.value !== confirmPassword.value) {
      confirmPasswordError.textContent = "Passwords do not match";
      return;
    }

    const userData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    const promise = new Promise<{ error: string; message: string }>(
      (resolve, reject) => {
        fetch("http://localhost:3550/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            if ("message" in data) {
              ApiMessageBox.classList.remove("text-danger");
              ApiMessageBox.classList.add("text-success");
              ApiMessageBox.textContent = data.message;
              setTimeout(() => {
                gotoLogin();
                resolve(data);
              }, 3000);
            } else if ("error" in data) {
              ApiMessageBox.classList.remove("text-success");
              ApiMessageBox.classList.add("text-danger");
              ApiMessageBox.textContent = data.error;

              setTimeout(() => {
                ApiMessageBox.style.display = "none";
                location.href = "../pages/register.html";
              }, 3000);

              reject(data);
            }

            console.log(data);
          })
          .catch((error) => {
            console.log(error);
            location.href = "../pages/register.html";
          });
      }
    );
    function gotoLogin() {
      location.href = "../pages/login.html";
    }
  });
});
