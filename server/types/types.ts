import { Request } from 'express';

export interface SignUpWithEmailUser {
  name: string;
  email: string;
  password: string;
  address1?: string;
  address2?: string;
  city?: string;
  county?: string;
  country?: string;
  postcode?: string;
}

export interface DatabaseUser extends SignUpWithEmailUser {
  id: number
} 

export interface ReqUser extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
    password: string;
    address1?: string;
    address2?: string;
    city?: string;
    county?: string;
    country?: string;
    postcode?: string;
  };
}
