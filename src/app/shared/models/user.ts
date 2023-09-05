export interface User{
  id:number;
  email:string;
  password:string;
  role:Role[];
}

export enum Role{
  ADMIN,
  TENANT,
  SUPPLIER,
  USER
}
