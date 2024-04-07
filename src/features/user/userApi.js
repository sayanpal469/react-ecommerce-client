export const fetchLoggedInUserOrder = (userId) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/orders/user/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => {
        // Handle any errors here and reject the Promise if needed
        console.error("Fetch error:", error);
        reject({ error: error.message });
      });
  });
};

export const fetchLoggedInUser = (userId) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => {
        // Handle any errors here and reject the Promise if needed
        console.error("Fetch error:", error);
        reject({ error: error.message });
      });
  });
};

export const updateUser = async (update) => {
  try {
    const response = await fetch("http://localhost:8080/users/update", {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log(response)

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData || "Failed to authenticate" };
    } else {
      const data = await response.json();
      return { data };
    }
  } catch (error) {
    return { error };
  }
};
