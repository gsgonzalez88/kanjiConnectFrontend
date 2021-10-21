export interface User {
  email: string;
  name: string;
  password: string;
  _id: string
}

export interface CreateUserDto extends Omit<User, 'id'> {}

export const emptyUser: User = {
  email: '',
  name: '',
  password: '',
  _id: ''
}
