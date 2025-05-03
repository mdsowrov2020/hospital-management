export interface User {
  id: number;
  email: string;
  role: "admin" | "doctor" | "patient";
  createdAt: string;
  updatedAt: string;
}

export interface RegisterUserData {
  email: string;
  password: string;
  isDoctor?: boolean;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}
