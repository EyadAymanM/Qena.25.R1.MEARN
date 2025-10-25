export class User {
  id?: number;
  name: string;
  email: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
}
