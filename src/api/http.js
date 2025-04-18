import axios from "axios";

export const HTTP = axios.create({
    baseURL: 'http://194.54.64.227:8000/api/v1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
  })
  