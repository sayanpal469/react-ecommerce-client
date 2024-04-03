/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
export const createUser = (userData) => {
  return new Promise((resolve) => {
    fetch("http://localhost:8080/auth/signup", {
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

export const checkUser = async (loginInfo) => {
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to authenticate");
    } else {
      const data = await response.json();
      console.log(data)
      return { data };
    }
  } catch (error) {
    return { error };
  }
};

export const signOut = () => {
  return new Promise(async (resolve) => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      resolve({ data: "success" });
    }, 1000); // Simulate a delay of 1000 milliseconds (1 second)
  });
};
