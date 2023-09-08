export class User {
  id!: number;
  fullname: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = '';
  contract!: number;
  token: string = '';
}
