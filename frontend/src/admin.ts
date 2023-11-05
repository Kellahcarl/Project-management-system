const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_email");
  location.href = "../pages/login.html";
};

const fetchProjects = async () => {
  try {
    const response = await fetch("http://localhost:3550/project");
    if (!response.ok) {
      throw new Error("Failed to fetch projects.");
    }
    const data = await response.json();

    displayProjects(data);
  } catch (error) {
    console.error(error);
  }
};

const displayProjects = (projects: any[]) => {
  const productContent = document.querySelector(".product-content");
  if (!productContent) {
    console.error("product-content element not found.");
    return;
  }

  const html = projects
    .map((project) => {
      const dueDate = new Date(project.dueDate);
      const formattedDate = dueDate.toISOString().split("T")[0];

      return `
        <div class="col-12 col-md-6 col-lg-6 ">
          <div class="card shadow features-card" data-id="${project.project_id}">
            <div class="card-body" style="display: flex; flex-direction: column; align-items: center;">
              <div class="card-title text-center h3 fw-normal mb-3">
                ${project.project_name}
              </div>
              <div class="card-text text-center">
                <span class="text-center">${project.project_description}</span>
              </div>
              <div class="card-text text-center">
                <span class="text-center"> Due by: ${formattedDate}</span>
              </div>
              <div class="card-text text-center">
                <span class="text-center"> Status : ${project.project_status} </span>
              </div>
              
              
              <div style="display: flex;  flex-direction: row; justify-content :center ; gap: 10px; width: 100%; margin-top: 10px">
                
                <ion-icon class="btn btn-primary "name="create-outline" id="editBtn" data-id="${project.project_id}"></ion-icon>
                <ion-icon class="btn btn-danger" id ="deleteBtn" data-id="${project.project_id}" onclick = deleteProject('${project.project_id}') name="trash-outline"></ion-icon>
                
              </div>
              
              <div style="display: flex; flex-direction: row; gap: 10px; width: 100%; margin-top: 10px;">
                <button class="btn btn-info" data-id="${project.project_id}" style="flex-grow: 1;">Assign</button>
                <button class="btn btn-warning" data-id="${project.project_id}" style="flex-grow: 1;">Unassign</button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  productContent.innerHTML = html;
};

const fetchUsers = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3550/user", {
      headers: {
        Token: ` ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users.");
    }
    const data = await response.json();

    displayUsers(data);
  } catch (error) {
    console.error(error);
  }
};

const displayUsers = (users: any[]) => {
  const userlistContent = document.querySelector(".userlist-content");
  if (!userlistContent) {
    console.error("userlist-content element not found.");
    return;
  }

  const html = users
    .map((user) => {
      return `
        <div class="user-card card shadow mb-2" data-id="${user.user_id}">
          <div class="user-card-content card-body">
            <div class="user-card-title card-title text-center h4 fw-normal mb-3">
              Username : ${user.username}
            </div>
            <div class="user-card-text text-center card-text">
              ${user.email}
            </div>
            <div class="user-card-status text-center card-text">
              Status: ${user.isAdmin ? "Admin" : "User"}
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  userlistContent.innerHTML = html;
};

document.addEventListener("DOMContentLoaded", () => {
  if (!isAuthenticated()) {
    location.href = "../pages/login.html";
  }

  fetchProjects(); //
  fetchUsers(); //

  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logoutUser();
    });
  }
});

setTimeout(() => {
  let editBtns = document.querySelectorAll(
    "#editBtn"
  ) as NodeListOf<HTMLButtonElement>;
  let deleteBtns = document.querySelectorAll("#deleteBtn");

  editBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const project_id = btn.getAttribute("data-id");

      if (project_id) {
        localStorage.setItem("project_id", project_id);

        location.href = "updateProject.html";
      }
    });
  });
}, 1000);

async function deleteProject(project_id: string) {
  try {
    console.log("here");
    if (project_id) {
      const confirmDelete = confirm(
        "Are you sure you want to delete this project?"
      );

      if (confirmDelete) {
        const response = await fetch(
          `http://localhost:3550/project/${project_id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Project deleted successfully.");
          fetchProjects();
        } else {
          console.error("Failed to delete the project.");
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}
