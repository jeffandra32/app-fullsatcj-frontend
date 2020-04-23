export interface NewUserDTO {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  bio?: string;
  github?: string;
  linkedin?: string;
}
