export const createOrder = (order) => {
  return new Promise((resolve) => {
    fetch("https://react-ecommerce-server.onrender.com/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => {
        resolve({ error: error.message });
      });
  });
};

export const updateOrder = (order) => {
  return new Promise((resolve) => {
    fetch(`https://react-ecommerce-server.onrender.com/orders/${order.id}`, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => {
        resolve({ error: error.message });
      });
  });
};

export async function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  try {
    const response = await fetch(
      "https://react-ecommerce-server.onrender.com/orders?" + queryString
    );
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");

    return { data: { orders: data, totalOrders: +totalOrders } };
  } catch (error) {
    // Handle errors appropriately
    return { error: error.message };
  }
}
