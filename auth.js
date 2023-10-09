function getUser() {
  const user = localStorage.getItem("loggedInUser");

  if (!user) return null;

  return JSON.parse(user);
}

function getAllUsers() {
  const users = localStorage.getItem("gamersHubUsers");

  if (!users) return null;

  return JSON.parse(users);
}

function redirectIfNotLoggedIn() {
  const user = getUser();

  if (
    (!user && location.pathname === "index.html") ||
    (!user && location.pathname === "")
  ) {
    location.href = "login.html";
  }

  if (
    (user && location.pathname === "login.html") ||
    (user && location.pathname === "signup.html")
  ) {
    location.href = "index.html";
  }
}

function register() {
  const formContainer = document.querySelector("[data-form-container]");
  const errorMessage = document.querySelector("[data-form-error]");

  // getting input values
  const name = formContainer.querySelector('[name="name"]').value;
  const username = formContainer.querySelector('[name="username"]').value;
  const password = formContainer.querySelector('[name="password"]').value;

  const userObj = {
    name,
    username,
    password,
  };

  // get all user in localstorage
  const users = getAllUsers();
  if (!users) {
    localStorage.setItem("gamersHubUsers", JSON.stringify([userObj]));
    localStorage.setItem("loggedInUser", JSON.stringify(userObj));
    location.href = "index.html";
  } else {
    // checks if user already exists in the localstorage
    if (users.find((user) => user.username === username)) {
      errorMessage.style.display = "block";
      errorMessage.textContent = "User already exists";
    } else {
      localStorage.setItem(
        "gamersHubUsers",
        JSON.stringify([...users, userObj])
      );
      localStorage.setItem("loggedInUser", JSON.stringify(userObj))
      location.href = "index.html";
    }
  }
}

function login() {
  const formContainer = document.querySelector("[data-form-container]");
  const errorMessage = document.querySelector("[data-form-error]");

  // getting input values
  const username = formContainer.querySelector('[name="username"]').value;
  const password = formContainer.querySelector('[name="password"]').value;

  // get all user in localstorage
  const users = getAllUsers();
  if (!users) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "User does not exist";
  } else {
    errorMessage.style.display = "none";

    const userObj = users.find(
      (user) => user.username === username && user.password === password
    );

    if (userObj) {
      localStorage.setItem("loggedInUser", JSON.stringify(userObj));
      location.href = "index.html";
    } else {
      errorMessage.style.display = "block";
      errorMessage.textContent = "Incorrect credentials";
    }
  }
  //   localStorage.setItem("gamersHubUsers", JSON.stringify([userObj]));
  //   localStorage.setItem("loggedInUser", JSON.stringify(userObj));
  //   location.href = "/";
  // } else {
  //   // checks if user already exists in the localstorage
  //   if (users.find((user) => user.username === username)) {
  //     errorMessage.style.display = "block";
  //     errorMessage.textContent = "User already exists";
  //   } else {
  //     localStorage.setItem(
  //       "gamersHubUsers",
  //       JSON.stringify([...users, userObj])
  //     );
  //     localStorage.setItem("loggedInUser", JSON.stringify(userObj));
  //     location.href = "/";
  //   }
  // }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.href = "login.html";
}

// if user is in home page, we will check if they are logged in or not
// if not, they will be redirected to login page
redirectIfNotLoggedIn()