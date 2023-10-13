import { AddWarehouse } from '@features/inventory';
import { WarehouseDropdown } from '@features/inventory';
import { EditWarehouses } from '@features/inventory';
import { WarehouseProps } from '@features/inventory';

export default function WarehouseGroup({
  warehouses,
}: {
  warehouses: WarehouseProps;
}) {
  return (
    <>
      <AddWarehouse
        warehouses={warehouses.warehouses}
        handleUpdateWarehouses={warehouses.setWarehouses}
      />
      <EditWarehouses
        warehouses={warehouses.warehouses}
        handleUpdateWarehouses={warehouses.setWarehouses}
      />
      <WarehouseDropdown
        warehouses={warehouses.warehouses}
        handleUpdateWarehouses={warehouses.setWarehouses}
      />
    </>
  );
}
