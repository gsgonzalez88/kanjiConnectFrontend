export interface User {
  email: string;
  username: string;
  password: string;
  role: string;
  _id: string
}

export interface CreateUserDto extends Omit<User, 'id'> {}

export const emptyUser: User = {
  email: '',
  username: '',
  password: '',
  role: '',
  _id: ''
}
