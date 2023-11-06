document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById(
    "logout-button"
  ) as HTMLButtonElement;
  const projectCard = document.querySelector(".card") as HTMLDivElement;

  if (!Authenticated()) {
    location.href = "../pages/login.html";
    // Redirect to the login page if there is no token
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logoutUser3();
    });
  }

  // Make a GET request to fetch user details and project details
  fetch("http://localhost:3550/user/check_user_details", {
    method: "GET",
    headers: {
      token: ` ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      const userId = data.info.id;
      // console.log(userId);

      // Now, make a POST request to get the assigned project
      fetch("http://localhost:3550/project/getUserAssignedProjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      })
        .then((response) => response.json())
        .then((projectData) => {
          // console.log(projectData.project);

          if (projectData.project) {
            // If no assigned projects, display a message
            const noProjectsMessage = document.createElement("p");
            noProjectsMessage.classList.add("card-text","text-center","my-5");
            noProjectsMessage.textContent = "You have no assigned projects.";
            projectCard.innerHTML =""
            projectCard.appendChild(noProjectsMessage);
          } else {
            // Update the HTML elements with the project information
            const projectTitle = projectCard.querySelector(
              ".card-title"
            ) as HTMLHeadingElement;
            const projectDescription = projectCard.querySelector(
              ".card-text:nth-child(2)"
            ) as HTMLParagraphElement;
            const dueDate = projectCard.querySelector(
              ".card-text:nth-child(3)"
            ) as HTMLParagraphElement;

            projectTitle.textContent = projectData.project_name;
            projectDescription.textContent = projectData.project_description;
            dueDate.textContent =
              "Due Date: " + new Date(projectData.dueDate).toDateString();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

const Authenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

const logoutUser3 = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_email");
  location.href = "../pages/login.html";
};
