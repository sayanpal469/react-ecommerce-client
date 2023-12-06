/* eslint-disable no-undef */
export const createUser = (userData) => {
  return new Promise((resolve) => {
    fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => {
        // Handle any errors here and reject the Promise if needed
        resolve({ error: error.message });
      });
  });
};

export const updateUser = (update) => {
  return new Promise((resolve) => {
    fetch(`http://localhost:8080/users/${update.id}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => {
        // Handle any errors here and reject the Promise if needed
        resolve({ error: error.message });
      });
  });
};

export const checkUser = (loginInfo) => {
  return new Promise((resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    fetch("http://localhost:8080/users?email=" + email)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 1) {
          if (password === data[0].password) {
            resolve({ data: data[0] });
          } else {
            reject({ message: "wrong credentials" });
          }
        } else {
          reject({ message: "User not found" });
        }
      })
      .catch((error) => {
        reject({ error: error.message });
      });
  });
};
