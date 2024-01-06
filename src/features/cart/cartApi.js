/* eslint-disable no-async-promise-executor */
export const addToCart = (item) => {
  return new Promise((resolve) => {
    fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
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

export const fetchItemsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/cart?user.id=${userId}`)
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

export const updateCart = (update) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/cart/${update.id}`, {
      // Correct URL construction
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        resolve({ data });
      })
      .catch((error) => {
        // Handle any errors here and reject the Promise if needed
        console.error("Update Cart error:", error);
        reject({ error: error.message });
      });
  });
};

export const deleteCartItem = (itemId) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/cart/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        resolve({ data });
      })
      .catch((error) => {
        // Handle any errors here and reject the Promise if needed
        console.error("Delete Cart Item error:", error);
        reject({ error: error.message });
      });
  });
};

export const resetCart = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Fetch items associated with the user ID
      const response = await fetchItemsByUserId(userId);
      const items = response.data;

      // Iterate through each item and delete it
      for (const item of items) {
        await deleteCartItem(item.id);
      }

      console.log("Cart reset successfully.");
      resolve("Cart reset successfully.");
    } catch (error) {
      console.error("Error resetting cart:", error.message);
      reject(error.message);
      // Handle errors as needed
    }
  });
};
