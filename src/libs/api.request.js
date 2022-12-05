import HttpRequest from "@/libs/axios";
const baseUrl = process.env.NODE_ENV === "development" ? 'http://192.168.1.221:8878/' : '';

const axios = new HttpRequest(baseUrl);
export default axios;
