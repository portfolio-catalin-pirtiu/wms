import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { Warehouse, WarehouseGroupProps } from '../../../../../../types/types';
import getSelectedWarehouseFromLocalStorage from '../../../../../../utils/localStorage/getSelectedWarehouse';

export default function WarehouseDropdown({
  warehouses,
  handleUpdateWarehouses,
}: WarehouseGroupProps) {
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse>(
    getSelectedWarehouseFromLocalStorage,
  );

  function handleChangeWarehouseSelection(warehouse: Warehouse) {
    setSelectedWarehouse(warehouse);
    localStorage.setItem('selectedWarehouse', JSON.stringify(warehouse));
  }

  return (
    <Dropdown role="menu">
      <Dropdown.Toggle variant="secondary">
        {selectedWarehouse.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => handleChangeWarehouseSelection({ id: 0, name: 'All' })}
        >
          All
        </Dropdown.Item>

        {warehouses.map((warehouse) => (
          <Dropdown.Item
            key={warehouse.id}
            onClick={() => handleChangeWarehouseSelection(warehouse)}
          >
            {warehouse.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
