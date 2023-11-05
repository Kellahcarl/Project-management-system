// Define a function to check if the user is authenticated
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

// Function to handle user logout
const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_email");
  location.href = "../pages/login.html";
};

// Function to fetch projects from the API
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

// Function to display projects in the "product-content" element
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
              <div class="card-text text-center">
                <span > Mark as complete </span>
                <input type="checkbox" class="form-check-input" style="width: 1.5em; height: 1.5em;" />
              </div>
              
              <div style="display: flex;  flex-direction: row; gap: 10px; width: 100%; margin-top: 10px">
                <button class="btn btn-primary" style="flex-grow: 1;">Edit</button>
                
                <button class="btn btn-danger" style="flex-grow: 1;">Delete</button>
              </div>
              
              <div style="display: flex; flex-direction: row; gap: 10px; width: 100%; margin-top: 10px;">
                <button class="btn btn-info" style="flex-grow: 1;">Assign</button>
                <button class="btn btn-warning" style="flex-grow: 1;">Unassign</button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  productContent.innerHTML = html;
};

// Function to fetch users from the API
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

// Function to display users in the "userlist-content" element
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

// Add an event listener to fetch and display projects and users when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if the user is authenticated
  if (!isAuthenticated()) {
    location.href = "../pages/login.html"; // Redirect to login if not authenticated
  }

  fetchProjects(); // Fetch and display projects
  fetchUsers(); // Fetch and display users

  // Add a click event listener to the logout button
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logoutUser(); // Logout the user when the button is clicked
    });
  }
});

// Add this code to your existing TypeScript file

interface Project {
  project_id: string;
  project_name: string;
  project_description: string;
  dueDate: string;  
}
// Function to open the Edit Project modal with project data
const openEditProjectModal = (project : Project) => {

 
  const editProjectModal = new bootstrap.Modal(document.getElementById("editProjectModal")!);
  const editProjectForm = document.getElementById("editProjectForm") as HTMLFormElement;
  const editProjectName = document.getElementById("editProjectName") as HTMLInputElement;
  const editProjectDescription = document.getElementById("editProjectDescription") as HTMLInputElement;
  const editProjectDueDate = document.getElementById("editProjectDueDate") as HTMLInputElement;

  // Fill the form with project data
  editProjectName.value = project.project_name;
  editProjectDescription.value = project.project_description;
  editProjectDueDate.value = project.dueDate;

  // Define a function to update the project
  const updateProject = async () => {
    try {
      const response = await fetch("http://localhost:3550/project", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: project.project_id,
          project_name: editProjectName.value,
          project_description: editProjectDescription.value,
          dueDate: editProjectDueDate.value,
        }),
      });
      if (response.ok) {
        // Display a success message here
        console.log("Project updated successfully");

        // Close the modal
        editProjectModal.hide();

        // Fetch and display updated projects
        fetchProjects();
      } else {
        // Handle error cases
        console.error("Failed to update project");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Add a click event listener to the "Save Changes" button
  document.getElementById("editProjectSubmit")?.addEventListener("click", updateProject);

  // Show the Edit Project modal
  editProjectModal.show();
};

// Add a click event listener to the "Edit" button on project cards
document.addEventListener("click", (event) => {
  if (event.target?.classList.contains("btn-primary")) {
    const projectId = event.target.closest(".features-card").getAttribute("data-id");
    const project = projects.find((p) => p.project_id === projectId);
    if (project) {
      openEditProjectModal(project);
    }
  }
});

