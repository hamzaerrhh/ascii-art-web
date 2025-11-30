import axios from "axios";
import Cookies from "js-cookie";

const server_uri = `${import.meta.env.VITE_SERVER_URI}/api/v1`;

// Generic API caller
export const ApiCall = async (
  method,
  uri,
  isToken = false,
  body = null,
  params = {}
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (isToken) {
      const token = Cookies.get("token");
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios({
      method: method.toLowerCase(),
      url: `${server_uri}${uri}`,
      headers,
      params,
      data: body ? JSON.stringify(body) : null,
    });

    return response;
  } catch (err) {
    console.error("API Error:", err.response?.data || err.message);
    throw err;
  }
};

//login api
export const loginApi = async (credentials) => {
  const response = await ApiCall("POST", "/login", false, credentials);

  // Store token if exists
  if (response.data.token) {
    Cookies.set("token", response.data.token, { expires: 7 }); // Expires in 7 days
  }

  return response;
};
// 🌿 Flexible call for Plants
export const AdvGETApiCall = async ({
  url,
  fields,
  populate,
  limit,
  skip,
  sort,
  filter,
  isToken = false,
} = {}) => {
  const params = {};

  if (fields) params.fields = Array.isArray(fields) ? fields.join(",") : fields;
  if (populate)
    params.populate = Array.isArray(populate) ? populate.join(",") : populate;
  if (limit) params.limit = limit;
  if (skip) params.skip = skip;
  if (sort) params.sort = sort;
  if (filter) params.filter = JSON.stringify(filter);

  return await ApiCall("GET", url, isToken, null, params);
};

// 🌿 Get all products (for select dropdown)
export const getProductsForSelect = async () => {
  try {
    const response = await AdvGETApiCall({
      url: "/products",
      fields: ["_id", "name", "headerImage"],
    });
    // Return the array of products
    return response.data;
  } catch (err) {
    console.error(
      "Error fetching products:",
      err.response?.data || err.message
    );
    return [];
  }
};

// 🌱 Get all plants (for select dropdown)
export const getPlantsForSelect = async () => {
  try {
    const response = await AdvGETApiCall({
      url: "/plant",
      fields: ["_id", "type", "scientificName", "name", "headerImage"],
    });
    // Return the array of plants
    return response.data;
  } catch (err) {
    console.error("Error fetching plants:", err.response?.data || err.message);
    return [];
  }
};
