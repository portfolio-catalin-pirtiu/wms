import AddWarehouse from './AddWarehouse/AddWarehouse';
import WarehouseDropdown from './WarehouseDropdown/WarehouseDropdown';
import { WarehouseProps } from '../../../../../types/types';
import EditWarehouses from './EditWarehouses/EditWarehouses';

export default function WarehouseGroup({
  warehouses,
}: {
  warehouses: WarehouseProps;
}) {
  return (
    <>
      <AddWarehouse
        warehouses={warehouses.value}
        handleUpdateWarehouses={warehouses.onChange}
      />
      <EditWarehouses />
      <WarehouseDropdown
        warehouses={warehouses.value}
        handleUpdateWarehouses={warehouses.onChange}
      />
    </>
  );
}
