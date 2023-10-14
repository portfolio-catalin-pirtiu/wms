export interface IWarehouse {
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

export interface IWarehouseGroupProps {
  warehouses: IWarehouse[];
  onWarehouseChange: (warehouses: IWarehouse[]) => void;
}