document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById(
    "logout-button"
  ) as HTMLButtonElement;

  if (!Authenticated()) {
    location.href = "../pages/login.html";
    // Redirect to the login page if there is no token
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logoutUser3();
    });
  }

  getAssignedProject();
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

const getAssignedProject = () => {
  const projectCard = document.querySelector(".card") as HTMLDivElement;
  fetch("http://localhost:3550/user/check_user_details", {
    method: "GET",
    headers: {
      token: ` ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const userId = data.info.id;

      fetch("http://localhost:3550/project/getUserAssignedProjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      })
        .then((response) => response.json())
        .then((projectData) => {
          console.log(projectData);

          if (projectData.project) {
            const noProjectsMessage = document.createElement("p");
            noProjectsMessage.classList.add("card-text", "text-center", "my-5");
            noProjectsMessage.textContent = "You have no assigned projects.";
            projectCard.innerHTML = "";
            projectCard.appendChild(noProjectsMessage);
          } else {
            const projectTitle = projectCard.querySelector(
              ".card-title"
            ) as HTMLHeadingElement;
            const projectDescription = projectCard.querySelector(
              ".card-text:nth-child(2)"
            ) as HTMLParagraphElement;
            const dueDate = projectCard.querySelector(
              ".card-text:nth-child(3)"
            ) as HTMLParagraphElement;
            const status = projectCard.querySelector(
              ".card-text:nth-child(4)"
            ) as HTMLParagraphElement;
            const inProgressButton = projectCard.querySelector(
              ".btn-warning"
            ) as HTMLButtonElement;
            
            const completeCheckbox = projectCard.querySelector(
              "input[type='checkbox']"
            ) as HTMLInputElement;

            projectTitle.textContent = projectData.project_name;
            projectDescription.textContent = projectData.project_description;
            dueDate.textContent =
              "Due Date: " + new Date(projectData.dueDate).toDateString();
            status.textContent = "Status: " + projectData.project_status;


              if (projectData.project_status === "Complete") {
                completeCheckbox.disabled = true;
            }else if (projectData.project_status === "in Progress") {
              inProgressButton.disabled = true;
            }

              // Event listener for "In Progress" button
              inProgressButton.addEventListener("click", () => {
                // Make an API request to mark the project as in progress
                fetch(
                  `http://localhost:3550/project/inprogress/${projectData.project_id}`,
                  {
                    method: "GET",
                  }
                )
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("Project marked as in progress:", data);
                    // Refresh the assigned project details after the update
                    getAssignedProject();
                  })
                  .catch((error) => {
                    console.error(
                      "Error marking project as in progress:",
                      error
                    );
                  });
              });

              // Event listener for "Mark as Complete" checkbox
              completeCheckbox.addEventListener("change", () => {
                if (completeCheckbox.checked) {
                  // Make an API request to mark the project as complete
                  fetch(
                    `http://localhost:3550/project/complete/${projectData.project_id}`,
                    {
                      method: "GET",
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("Project marked as complete:", data);
                      // Disable the checkbox and refresh the assigned project details
                      completeCheckbox.disabled = true;
                      getAssignedProject();
                    })
                    .catch((error) => {
                      console.error(
                        "Error marking project as complete:",
                        error
                      );
                    });
                }
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
