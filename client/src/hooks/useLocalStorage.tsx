import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Warehouse } from '@features/inventory';

export default function useLocalStorage(key: string): [Warehouse, Dispatch<SetStateAction<Warehouse>>] {
  const [data, setData] = useState<Warehouse>({ id: 0, name: 'Warehouse' });

  useEffect(() => {
    if (key === 'selectedWarehouse') {
      const localStorageWarehouse = localStorage.getItem(key);
      if (typeof localStorageWarehouse === 'string') {
        const warehouseName: Warehouse = JSON.parse(localStorageWarehouse);
        setData(warehouseName);
      } else {
        setData({ id: 0, name: 'Warehouse' });
      }
    }
  }, [key]);
  return [data, setData];
}
