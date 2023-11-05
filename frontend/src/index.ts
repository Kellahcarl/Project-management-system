const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
const signUpBtn = document.getElementById("signUpBtn") as HTMLButtonElement;

loginBtn.addEventListener("click", () => {
  location.href = "./pages/login.html";
});

signUpBtn.addEventListener("click", () => {
  location.href = "./pages/register.html";
});
