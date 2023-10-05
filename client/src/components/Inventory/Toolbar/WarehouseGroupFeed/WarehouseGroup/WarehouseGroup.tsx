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
