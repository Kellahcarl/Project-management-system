const isAuthenticated1 = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

const logoutUser1 = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_email");
  location.href = "../pages/login.html";
};

document.addEventListener("DOMContentLoaded", () => {
  if (!isAuthenticated1()) {
    location.href = "../pages/login.html";
  }

  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logoutUser1();
    });
  }
});
