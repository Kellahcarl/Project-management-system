document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById(
    "logout-button"
  ) as HTMLButtonElement;

  if (!Authenticated()) {
    location.href = "../pages/login.html";
    // Redirect to the login page if there is no token
  }

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    location.href = "../pages/login.html";
  });
});
const Authenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};
