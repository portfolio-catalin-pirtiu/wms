export interface Warehouse {
  id: number;
  owner?: number;
  name: string;
  address1?: string;
  address2?: string;
  city?: string;
  county?: string;
  country?: string;
  postcode?: string;
  row?: string;
  row_section?: string;
}

export interface WarehouseGroupProps {
  warehouses: Warehouse[];
  handleUpdateWarehouses: (warehouses: Warehouse[]) => void;
}

export interface WarehouseProps {
  warehouses: Warehouse[];
  setWarehouses: (warehouses: Warehouse[]) => void;
}