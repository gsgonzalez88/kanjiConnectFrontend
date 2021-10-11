export interface User {
  email: string;
  name: string;
  password: string;
  id: number
}

export interface CreateUserDto extends Omit<User, 'id'> {}
