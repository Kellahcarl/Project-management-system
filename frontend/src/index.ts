const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
const signUpBtn = document.getElementById("signUpBtn") as HTMLButtonElement;

loginBtn.addEventListener("click", () => {
  location.href = "./pages/sign-in.html";
});

signUpBtn.addEventListener("click", () => {
  location.href = "./pages/register.html";
});
