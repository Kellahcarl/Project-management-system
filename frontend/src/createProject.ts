const isAuthenticated2 = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

const logoutUser2 = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_email");
  location.href = "../pages/login.html";
};

document.addEventListener("DOMContentLoaded", () => {
  const createProjectForm = document.getElementById(
    "createProjectForm"
  ) as HTMLFormElement;

  if (!isAuthenticated2()) {
    location.href = "../pages/login.html";
  }

  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logoutUser2();
    });
  }

  if (createProjectForm) {
    createProjectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const project_name = (
        document.getElementById("project_name") as HTMLInputElement
      ).value;
      const project_description = (
        document.getElementById("project_description") as HTMLTextAreaElement
      ).value;
      const dueDate = (document.getElementById("dueDate") as HTMLInputElement)
        .value;

      const data = {
        project_name,
        project_description,
        dueDate,
        };
        
        console.log(data);
        

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch("http://localhost:3550/project", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.message) {
            console.log("Success Message:", result.message);
            alert(result.message);

            location.href = "admin.html";
          } else if (result.error) {
            console.error("Error Message:", result.error);
            alert(result.error);
          } else {
            console.error("Unknown response format:", result);
            alert("An error occurred while creating the project.");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while creating the project.");
        });
    });
  }
});
