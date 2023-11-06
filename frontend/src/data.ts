// const isAuthenticated = (): boolean => {
//   const token = localStorage.getItem("token");
//   return !!token;
// };

// const logoutUser = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user_email");
//   location.href = "../pages/login.html";
// };

// const fetchProjects = async () => {
//   try {
//     const response = await fetch("http://localhost:3550/project");
//     if (!response.ok) {
//       throw new Error("Failed to fetch projects.");
//     }
//     const data = await response.json();

//     displayProjects(data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const displayProjects = (projects: any[]) => {
//   const productContent = document.querySelector(".product-content");
//   if (!productContent) {
//     console.error("product-content element not found.");
//     return;
//   }

//   const html = projects
//     .map((project) => {
//       const dueDate = new Date(project.dueDate);
//       const formattedDate = dueDate.toISOString().split("T")[0];

//       return `
//         <div class="col-12 col-md-6 col-lg-6 ">
//           <div class="card shadow features-card" data-id="${project.project_id}">
//             <div class="card-body" style="display: flex; flex-direction: column; align-items: center;">
//               <div class="card-title text-center h3 fw-normal mb-3">
//                 ${project.project_name}
//               </div>
//               <div class="card-text text-center">
//                 <span class="text-center">${project.project_description}</span>
//               </div>
//               <div class="card-text text-center">
//                 <span class="text-center"> Due by: ${formattedDate}</span>
//               </div>
//               <div class="card-text text-center">
//                 <span class="text-center"> Status : ${project.project_status} </span>
//               </div>
              
              
//               <div style="display: flex;  flex-direction: row; justify-content :center ; gap: 10px; width: 100%; margin-top: 10px">
                
//                 <ion-icon class="btn btn-primary "name="create-outline" id="editBtn" data-id="${project.project_id}"></ion-icon>
//                 <ion-icon class="btn btn-danger" id ="deleteBtn" data-id="${project.project_id}" onclick = deleteProject('${project.project_id}') name="trash-outline"></ion-icon>
                
//               </div>
              
//               <div style="display: flex; flex-direction: row; gap: 10px; width: 100%; margin-top: 10px;">
//                 <select class="form-select btn btn-info" id="select_user_${project.project_id}" aria-label="Default select example" style="flex-grow: 1;" data-id="${project.project_id}" onchange="handleUserSelection(this)">
//                   <option selected>assign user</option>
//                   <option value="1">One</option>
                  
//                 </select>
                
//                 <button class="btn btn-warning unassign-button" id ="unassignButton" data-id="${project.project_id}" style="flex-grow: 1;" onclick = handleUnassign(this) >Unassign</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       `;
//     })
//     .join("");

//   productContent.innerHTML = html;
// };

// const fetchUsers = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     console.error("Token not found.");
//     return;
//   }

//   try {
//     const response = await fetch("http://localhost:3550/user", {
//       headers: {
//         Token: ` ${token}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch users.");
//     }
//     const data = await response.json();

//     displayUsers(data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const displayUsers = (users: any[]) => {
//   const userlistContent = document.querySelector(".userlist-content");
//   if (!userlistContent) {
//     console.error("userlist-content element not found.");
//     return;
//   }

//   const html = users
//     .map((user) => {
//       return `
//         <div class="user-card card shadow mb-2" data-id="${user.user_id}">
//           <div class="user-card-content card-body">
//             <div class="user-card-title card-title text-center h4 fw-normal mb-3">
//               Username : ${user.username}
//             </div>
//             <div class="user-card-text text-center card-text">
//               ${user.email}
//             </div>
//             <div class="user-card-status text-center card-text">
//               Status: ${user.isAdmin ? "Admin" : "User"}
//             </div>
//           </div>
//         </div>
//       `;
//     })
//     .join("");

//   userlistContent.innerHTML = html;
// };

// document.addEventListener("DOMContentLoaded", () => {
//   if (!isAuthenticated()) {
//     location.href = "../pages/login.html";
//   }

//   fetchProjects();
//   fetchUsers();
//   fetchUnassignedUsers();

//   const logoutButton = document.getElementById("logout-button");
//   if (logoutButton) {
//     logoutButton.addEventListener("click", () => {
//       logoutUser();
//     });
//   }
// });

// setTimeout(() => {
//   let editBtns = document.querySelectorAll(
//     "#editBtn"
//   ) as NodeListOf<HTMLButtonElement>;
//   let deleteBtns = document.querySelectorAll("#deleteBtn");

//   editBtns.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const project_id = btn.getAttribute("data-id");

//       if (project_id) {
//         localStorage.setItem("project_id", project_id);

//         location.href = "updateProject.html";
//       }
//     });
//   });
// }, 1000);

// async function deleteProject(project_id: string) {
//   try {
//     console.log("here");
//     if (project_id) {
//       const confirmDelete = confirm(
//         "Are you sure you want to delete this project?"
//       );

//       if (confirmDelete) {
//         const response = await fetch(
//           `http://localhost:3550/project/${project_id}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (response.ok) {
//           console.log("Project deleted successfully.");
//           fetchProjects();
//         } else {
//           console.error("Failed to delete the project.");
//         }
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// const updateProject = document.getElementById(
//   "createProject"
// ) as HTMLButtonElement;

// updateProject.addEventListener("click", () => {
//   location.href = "../pages/createProject.html";
// });

// const fetchUnassignedUsers = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     console.error("Token not found.");
//     return;
//   }

//   try {
//     const response = await fetch("http://localhost:3550/user", {
//       // code to change to get unassigned users
//       method: "GET",
//       headers: {
//         Token: ` ${token}`,
//       },
//     });

//     if (!response.ok) {
//       console.log("here");

//       throw new Error("Failed to fetch unassigned users.");
//     }

//     const data = await response.json();

//     // console.log(data);

//     // Call a function to populate the select box with unassigned users
//     // populateUnassignedUsersSelect(data);

//     const projects = document.querySelectorAll(".card.shadow.features-card");

//     projects.forEach((project) => {
//       const projectId = project.getAttribute("data-id");
//       const selectUser = document.getElementById(
//         `select_user_${projectId}`
//       ) as HTMLSelectElement;

//       // Check if selectUser exists, then populate it
//       if (selectUser) {
//         populateUnassignedUsersSelect(data, selectUser);
//       }
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Function to populate the select box with unassigned users
// const populateUnassignedUsersSelect = (
//   users: any[],
//   selectUser: HTMLSelectElement
// ) => {
//   selectUser.innerHTML = "<option selected>assign user</option>";

//   // Add unassigned users to the select box
//   users.forEach((user) => {
//     const option = document.createElement("option");
//     option.value = user._id;
//     // console.log(user);

//     option.textContent = user.username;
//     selectUser.appendChild(option);
//   });
// };

// // Function to assign a user to a project
// const assignUserToProject = async (project_id: string, user_id: string) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     console.error("Token not found.");
//     return;
//   }
//   console.log(project_id, user_id);

//   try {
//     const response = await fetch("http://localhost:3550/project/assign", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Token: ` ${token}`,
//       },
//       body: JSON.stringify({ project_id, user_id }),
//     });

//     if (!response.ok) {
//       console.log("Failed to assign user to the project.");

//       throw new Error("Failed to assign user to the project.");
//     } else {
//       fetchProjects();
//     }

//     // Handle success, maybe update the UI to reflect the assignment
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Function to unassign a user from a project
// const unassignUserFromProject = async (project_id: string) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     console.error("Token not found.");
//     return;
//   }

//   try {
//     const response = await fetch("http://localhost:3550/project/unAssign", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Token: ` ${token}`,
//       },
//       body: JSON.stringify({ project_id }),
//     });

//     if (!response.ok) {
//       console.log("Failed to unassign user from the project.");

//       throw new Error("Failed to unassign user from the project.");
//     }

//     const data = await response.json();
//     console.log(data.message);

//     fetchProjects();
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Function to get the selected project's ID
// const getSelectedProjectId = () => {
//   const selectedProject = document.querySelector(
//     ".card.shadow.features-card.active"
//   );
//   return selectedProject ? selectedProject.getAttribute("data-id") : null;
// };

// // Function to get the selected user's ID
// const getSelectedUserId = () => {
//   const selectUser = document.getElementById(
//     "select_user"
//   ) as HTMLSelectElement;
//   return selectUser ? selectUser.value : null;
// };

// const handleUserSelection = (selectElement: HTMLSelectElement) => {
//   const projectId = selectElement.getAttribute("data-id");
//   const selectedUserId = selectElement.value;

//   // console.log(selectElement);

//   if (projectId && selectedUserId !== "assign user") {
//     assignUserToProject(projectId, selectedUserId);
//   }
// };

// const handleUnassign = (selectElement: HTMLElement) => {
//   const projectId = selectElement.getAttribute("data-id");
//   console.log(projectId, "clicked");

//   try {
//     unassignUserFromProject(projectId!);
//   } catch (error) {
//     console.log(error);
//   }
// };
