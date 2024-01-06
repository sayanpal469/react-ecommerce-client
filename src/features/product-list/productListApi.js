// productListApi.js
export const fetchAllProducts = async () => {
  try {
    const response = await fetch("http://localhost:8080/products");
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
    const response = await fetch("http://localhost:8080/products/" + id);

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

export function fetchProductsByFilters(filter, sort, pagination, admin) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }

  return new Promise((resolve) => {
    fetch("http://localhost:8080/products?" + queryString)
      .then(async (response) => {
        const data = await response.json();
        const totalItems = await response.headers.get("X-Total-Count");
        resolve({ data: { products: data, totalItems: +totalItems } });
      })
      .catch((error) => {
        // Handle errors appropriately
        resolve({ error: error.message });
      });
  });
}

export function fetchCategories() {
  return new Promise((resolve) => {
    fetch("http://localhost:8080/categories")
      .then((response) => response.json())
      .then((data) => resolve({ data }))
      .catch((error) => resolve({ error: error.message }));
  });
}

export function fetchBrands() {
  return new Promise((resolve) => {
    fetch("http://localhost:8080/brands")
      .then((response) => response.json())
      .then((data) => resolve({ data }))
      .catch((error) => resolve({ error: error.message }));
  });
}
