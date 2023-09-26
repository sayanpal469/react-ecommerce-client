// productListApi.js
export const fetchAllProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch("https://dummyjson.com/products/" + id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
