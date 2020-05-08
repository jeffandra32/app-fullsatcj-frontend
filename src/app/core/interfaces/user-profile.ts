export interface UserProfileDTO {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  title?: string;
  github?: string;
  linkedin?: string;
  avatar?: string;
  avatar_url?: string;
  posts?: object;
  relationships?: object;
}
