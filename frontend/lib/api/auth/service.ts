import api from "../base/base";
import endpoints from "../base/endpoint";
import {
  AuthResponse,
  LoginUserData,
  RegisterUserData,
  User,
} from "../users/type";

export const registerUser = async (
  userdata: RegisterUserData
): Promise<AuthResponse> => {
  const response = await api.post(endpoints.auth.register, userdata);
  return response.data;
};

export const loginUser = async (
  credentials: LoginUserData
): Promise<AuthResponse> => {
  const response = await api.post(endpoints.auth.login, credentials);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get(endpoints.auth.me);

  return response.data.user;
};

export const registerAdmin = async (
  adminData: RegisterUserData
): Promise<User> => {
  const response = await api.post("/auth/admin/register", adminData);
  return response.data.user;
};
