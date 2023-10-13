import { useEffect, useState } from 'react';
import { Warehouse } from '@features/inventory';

export default function useLocalStorage(key: string) {
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
  }, [key, data]);
  return data;
}
