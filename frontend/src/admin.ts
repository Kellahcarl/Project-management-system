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
    console.log(data);

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
        <div class="col-12 col-md-6 col-lg-6 col-xl-4">
          <div class="card shadow features-card" data-id="${project.project_id}">
            <div class="card-body">
              <div class="card-title text-center h3 fw-normal  mb-3">
                ${project.project_name}
              </div>
              <div class="card-text text-center">
                <span class=" text-center">${project.project_description}</span>
              </div>
              <div class="card-text text-center">
                <span class=" text-center"> Due by: ${formattedDate}</span>
              </div>
              <div class="card-text text-center">
                <span class=" text-center"> Status : ${project.project_status} </span>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  productContent.innerHTML = html;
};

// Add an event listener to fetch and display projects when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if the user is authenticated
  if (!isAuthenticated()) {
    location.href = "../pages/login.html"; // Redirect to login if not authenticated
  }

  fetchProjects(); // Fetch and display projects

  // Add a click event listener to the logout button
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logoutUser(); // Logout the user when the button is clicked
    });
  }
});
