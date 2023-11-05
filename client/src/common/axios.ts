import { ApiService } from "../services/api.service";
import axios from "axios";
import { Environment } from "./environment";

const AxiosBase = axios.create({
  baseURL: Environment.serverUrl
});

const AxiosAuthorized = axios.create({
  baseURL: Environment.serverUrl
});

AxiosAuthorized.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("authentication.access_token")}`;

const setAuthorizationHeader = () => {
  const token = ApiService.getToken();

  if (token) {
    AxiosAuthorized.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete AxiosAuthorized.defaults.headers.common['Authorization'];
  }
};

export { AxiosBase, AxiosAuthorized, setAuthorizationHeader }