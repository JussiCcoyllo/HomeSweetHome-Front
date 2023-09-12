export class User {
  id!: number;
  fullname: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: 'tenant' | 'supplier' | 'admin' | '' = '';
  contract!: number;
  token: string = '';
}
