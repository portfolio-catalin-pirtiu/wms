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

export interface ResponseStatus {
  error: string;
  success: string;
  message: string;
}

export interface LoggedInUser {
  isLoggedIn: boolean;
  id?: number;
  name?: string;
  email?: string;
}

export interface Warehouse {
  id: number;
  owner?: number;
  name: string;
  address1?: string;
  address2?: string;
  city?: string;
  county?: string;
  country?: string;
  row?: string;
  row_section?: string;
}

export interface WarehouseGroupProps {
  warehouses: Warehouse[];
  handleUpdateWarehouses: (warehouses: Warehouse[]) => void;
}

export interface WarehouseProps {
  value: Warehouse[];
  onChange: (warehouses: Warehouse[]) => void;
}
