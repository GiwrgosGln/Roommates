export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  profile_picture?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
}
