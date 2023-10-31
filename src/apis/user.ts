import member_request from "./request";
import { LoginType, RegisterType } from "../types";
import axios from "axios";
import { useUser } from "../store/userStore";
import { handleApiError } from "./errorHandling";

export const LoginApi = async (params: LoginType) => {
  try {
    const response = await member_request.post(`/member/login`, params);
    const { jwt } = useUser.getState();
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    }
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const RegisterApi = async (params: RegisterType) => {
  try {
    const response = await member_request.post("/member/register", params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const ValidIdApi = async (id: string) => {
  try {
    const response = await member_request.get(`/member/id_available/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
