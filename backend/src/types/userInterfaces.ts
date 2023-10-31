export interface user {
  id: string;
  username: string;
  password: string;
  email: string;
  isdeleted: boolean;
  isAdmin: boolean;
}

export interface updatUser {
  id: string;
  username: string;
  email: string;
}
