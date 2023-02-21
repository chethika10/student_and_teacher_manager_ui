import axios from "axios";
//Axios

export const http = axios.create({
    baseURL: 'http://localhost:8080/stmanager',
    withCredentials:true
  });
