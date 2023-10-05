import { Warehouse } from '../../types/types';

export default function getSelectedWarehouseFromLocalStorage() {
  const localStorageSearch = localStorage.getItem('selectedWarehouse');

  if (typeof localStorageSearch === 'string') {
    const warehouseName: Warehouse = JSON.parse(localStorageSearch);
    return warehouseName;
  } else {
    return { id: 0, name: 'Warehouse' };
  }
}
