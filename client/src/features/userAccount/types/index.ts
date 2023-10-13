export interface DatabaseUser {
  id?: number;
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

export interface LoggedInUser {
  isLoggedIn: boolean;
  id?: number;
  name?: string;
  email?: string;
}