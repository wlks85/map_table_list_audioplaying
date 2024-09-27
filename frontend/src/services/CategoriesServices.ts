import axios from "axios";
const env = import.meta.env;
// const host: string = env.VITE_API_ROOT || "176.10.111.19";
// const port: string = env.VITE_NODE_ENV === "local" ? ":8000" : "";
// const scheme: string = env.VITE_NODE_ENV === "local" ? "http" : "https";
const BASE_URL = `http://176.10.111.19:8001/api/v1`;

export const CategoriesServices = {
    async getCategories() {
      try {
        // console.log(`${BASE_URL}/categories`)
        const { status, data } = await axios.get(`${BASE_URL}/categories`);
        // console.log('first')
        if (status === 200) return data;
        throw new Error("Could not fetch data");
      } catch (error) {
        console.error(error);
        // Handle error appropriately here
        return null;
      }
    },
    async getSubCategories(category: string) {
      const { status, data } = await axios.get(`${BASE_URL}/categories/${category}`);
      if (status === 200) return data;
      else throw new Error("Could not fetch data");
    },
    async getPageTitle(pagenumber: string, page: string, ) {
      const { status, data } = await axios.get(`${BASE_URL}/variant?page=${page}&limit=10&pageNumber=${pagenumber}`);
      // console.log(`${BASE_URL}/categories/pagedata?page=${page}&limit=10&pageNumber=${pagenumber}`);
      if (status === 200) return data;
      else throw new Error("Could not fetch data");
    },
    
  };