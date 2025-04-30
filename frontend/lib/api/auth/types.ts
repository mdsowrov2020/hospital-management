import { User } from "../users/type";

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}

export interface CurrentUserResponse {
  success: boolean;
  user: User;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
