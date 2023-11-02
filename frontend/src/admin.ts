// import { isAuthenticated,  logout } from "./auth";

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById(
    "logout-button"
  ) as HTMLButtonElement;

  if (!isAuthenticated()) {
    location.href = "../pages/login.html";
    // Redirect to the login page if there is no token
  }

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    location.href = "../pages/login.html";
  });
});
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};