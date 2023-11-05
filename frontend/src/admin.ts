// import { isAuthenticated,  logout } from "./auth";

import bootstrap from "bootstrap";

const toolTips = document.querySelectorAll(".tt");
document.addEventListener("DOMContentLoaded", async () => {

  const projectData : any = await getData()
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

const getElement = (selection: string) => {
  const element = document.querySelector(selection) as HTMLElement;
  if (element) return element;
  throw new Error(`There is no such element: ${selection}, please check`);
};

toolTips.forEach((t) => {
  new bootstrap.Tooltip(t);
});

//function to get data from API
const getData = async (url: string): Promise<any> => {
  const response: Response = await fetch(url);
  if (response) {
    return response.json();
  }
  throw new Error("An error occurred while fetching the data.");
};

const projects: Element = getElement(".product-content");

const displayProject = (data: any[], section: Element): void => {
  const html: string = data
    .map((item) => {
      const { name, duedate, description, status, _id } = item;
      return `    
      <div class="col-12 col-md-6 col-lg-4 ">
        <div class="card shadow features-card" data-id=${_id}>
          <div class="card-body ">            
            <div
              class="card-title text-center h5 fw-normal text-muted mt-"
            >
              ${name}
            </div>
            <div class="card-text text-center">
              <span class="h4 text-center">${description}</span>
            </div>
            <div class="card-text text-center">
              <span class="h4 text-center"> Due by : ${duedate}</span>
            </div>
            <div class="card-text text-center">
              <span class="h4 text-center"> ${status} </span>
            </div>
            <div class="card-text text-center">
              <span class="h4 text-center">
                <ion-icon class="edit" name="create-outline"></ion-icon>              
                <input
                  type="checkbox"
                  id="complete"
                  name="complete"
                  value="complete"
                  title="complete"
                />
                <label for="complete"> </label>                      
                <ion-icon class="delete" name="trash-outline"></ion-icon>
              </span>
            </div>          
          </div>
        </div>
      </div>`;
    })
    .join("");
  section.innerHTML = html;
  const addBtns: NodeListOf<Element> = document.querySelectorAll(".addBtn");
  addBtns.forEach((btn: Element) => {
    btn.addEventListener("click", function (e: Event) {
      const id: string = (e.currentTarget as HTMLElement)?.dataset.id || "";

      e.preventDefault();
      //   console.log(e.currentTarget);
      // getting all ids of a card
    });
  });
};
