export class User{
  id!:number;
  fullname!:string;
  username!:string;
  email!:string;
  password!:string;
  confirmPassword!:string;
  role!:Role[];
  contract!:number;
}

export enum Role{
  ADMIN,
  TENANT,
  SUPPLIER,
  USER
}
