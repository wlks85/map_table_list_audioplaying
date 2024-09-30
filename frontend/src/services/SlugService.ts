import axios from "axios";
const env = import.meta.env;
const host: string = env.VITE_API_ROOT || "localhost";
const port: string = ":8001";
const scheme: string = env.VITE_NODE_ENV === "local" ? "http" : "https";
const BASE_URL = `${scheme}://${host}${port}/api/v1`;

export const SlugService = {
  async getSlug(slug: string) {
    const { status, data } = await axios.get(`${BASE_URL}/slugs/${slug}`);
    if (status === 200) return data;
    else throw new Error("Could not fetch data");
  },
};
