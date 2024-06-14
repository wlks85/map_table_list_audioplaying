import axios from "axios";
const env = import.meta.env;
const host: string = env.VITE_API_ROOT || "localhost";
const port: string = env.VITE_NODE_ENV === 'local' ? ":8082": "";
const scheme: string = process.env.VITE_NODE_ENV === 'local' ? 'http' : 'https';
const BASE_URL = `${scheme}://${host}${port}/api/v1`;
export const WordService = {
    async getWords() {
        const {status, data} = await axios.get(`${BASE_URL}/words`);
        if(status === 200) return data;
        else throw new Error("Could not fetch data")
    },
    async getWord(title: string, props: string[] = []) {
        let url = `${BASE_URL}/words/${title}/variants`;
        if(props.length === 1) {
            url = `${BASE_URL}/words/${title}/variants/${props[0]}`;
        }
        const {status, data} = await axios.get(url);
        if(status === 200) return data;
        else throw new Error("Could not fetch data")
    }
};
