import { apirequest } from "@/utils/apiHelpers";
import endpoints from "../base/endpoint";
import { CreateUserDto, UpdateUserDto, User } from "./type";

export const getUsers = async (): Promise<User[]> => {
  return apirequest<User[]>(endpoints.users.list);
};

export const getUser = async (id: string): Promise<User> => {
  return apirequest<User>(endpoints.users.detail(id));
};

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  return apirequest<User>(endpoints.users.base, {
    method: "POST",
    body: userData,
  });
};

export const updateUser = async (
  id: string,
  userData: UpdateUserDto
): Promise<User> => {
  return apirequest<User>(endpoints.users.detail(id), {
    method: "PUT",
    body: userData,
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  return apirequest<void>(endpoints.users.detail(id), {
    method: "DELETE",
  });
};
