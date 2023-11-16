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

export const ResetPasswordApi = async (id: string) => {
  try {
    const response = await member_request.get(`/member/reset_password/${id}`);
    return response.data;
    //"Your new password has been sent to your email"
  } catch (error) {
    return handleApiError(error);
  }
};

export const ChangePasswordApi = async ({
  id,
  password,
  newPassword,
}: {
  id: string;
  password: string;
  newPassword: string;
}) => {
  try {
    const response = await member_request.post("/member/change_password", {
      id,
      password,
      newPassword,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const WithdrawApi = async () => {
  try {
    const response = await member_request.delete("/delete");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
//todo : 로그아웃 구현
