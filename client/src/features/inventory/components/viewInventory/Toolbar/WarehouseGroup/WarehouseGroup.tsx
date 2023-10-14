import useWarehouses from '../../../../../../hooks/useWarehouses';
import { serverBaseUrl } from '../../../../../../data/constants';
import { IWarehouse } from '@features/inventory';
import { AddWarehouse } from '@features/inventory';
import { WarehouseDropdown } from '@features/inventory';
import { EditWarehouses } from '@features/inventory';

export default function WarehouseGroup() {
  const { warehouses, onWarehouseChange } = useWarehouses({ serverBaseUrl });

  function handleWarehouseChange(warehouse: IWarehouse[]) {
    onWarehouseChange(warehouse);
  }
  return (
    <>
      <AddWarehouse
        warehouses={warehouses}
        onWarehouseChange={handleWarehouseChange}
      />
      <EditWarehouses
        warehouses={warehouses}
        onWarehouseChange={handleWarehouseChange}
      />
      <WarehouseDropdown
        warehouses={warehouses}
        onWarehouseChange={handleWarehouseChange}
      />
    </>
  );
}
