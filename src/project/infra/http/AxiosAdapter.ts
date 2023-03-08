import axios from "axios";
import HttpClient from "./HttpClient";

export default class AxiosAdapter implements HttpClient {

    async get(url: string): Promise<void> {
        const response = await axios.get(url);
        return response.data;
    }

    async post(url: string, body: any): Promise<any> {
        const response = await axios.post(url);
        return response.data;
    }
}
