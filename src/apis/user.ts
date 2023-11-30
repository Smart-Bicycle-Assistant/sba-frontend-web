import member_request from './request';
import request from './request';
import { LoginType, RegisterType } from '../types';
import { handleApiError } from './errorHandling';

export const LoginApi = async (params: LoginType) => {
  try {
    const response = await member_request.post(`/member/login`, params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const RefreshApi = async () => {
  try {
    const res = await request.get(`/member/get_user_info`);
    return res.data;
  } catch (err) {
    return handleApiError(err);
  }
};

export const RegisterApi = async (params: RegisterType) => {
  try {
    const response = await member_request.post('/member/register', params);
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
    const response = await member_request.post('/member/change_password', {
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
    const response = await member_request.delete('/delete');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUserInfo = async (id: string, email: string, nickname: string) => {
  try {
    const response = await request.patch('/update_member', {
      id,
      email,
      nickname,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
