import axios from "axios";
const host: string = '192.168.0.104';
const BASE_URL = `http://${host}:8082/api/v1`;
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
