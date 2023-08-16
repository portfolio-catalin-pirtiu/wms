import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { Warehouse, WarehouseGroupProps } from '../../../../../../types/types';

export default function WarehouseDropdown({
  warehouses,
  handleUpdateWarehouses,
}: WarehouseGroupProps) {
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse>(
    getWarehouseNameFromLocalStorage,
  );
 
  function getWarehouseNameFromLocalStorage() {
    const localStorageSearch = localStorage.getItem('selectedWarehouse');

    if (typeof localStorageSearch === 'string') {
      const warehouseName: Warehouse = JSON.parse(localStorageSearch);
      return warehouseName;
    } else {
      return { id: 0, name: 'Warehouse' };
    }
  }

  function handleChangeWarehouseSelection(id: number, name: string) {
    setSelectedWarehouse({ id: id, name: name });
    localStorage.setItem(
      'selectedWarehouse',
      JSON.stringify({ id: id, name: name }),
    );
  }

  function Warehouse({ id, name }: Warehouse) {
    return (
      <Dropdown.Item onClick={() => handleChangeWarehouseSelection(id, name)}>
        {name}
      </Dropdown.Item>
    );
  }
  return (
    <Dropdown role="menu">
      <Dropdown.Toggle variant="secondary">
        {selectedWarehouse.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Warehouse id={0} name="All" />

        {warehouses.map((warehouse) => (
          <Warehouse key={warehouse.id} id={warehouse.id} name={warehouse.name} />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
