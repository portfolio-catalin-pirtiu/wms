import { IWarehouse } from '@features/inventory';

export class Warehouse implements IWarehouse {
  id: number;
  name: string;
  address1?: string | undefined;
  address2?: string | undefined;
  city?: string | undefined;
  county?: string | undefined;
  country?: string | undefined;
  postcode?: string | undefined;
  row?: string | undefined;
  row_section?: string | undefined;

  constructor(params: IWarehouse) {
    this.id = params.id;
    this.name = params.name;
    this.address1 = params.address1;
    this.address2 = params.address2;
    this.city = params.city;
    this.county = params.county;
    this.country = params.country;
    this.postcode = params.postcode;
    this.row = params.row;
    this.row_section = params.row_section;
  }
}
