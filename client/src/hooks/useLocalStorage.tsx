import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { IWarehouse } from '@features/inventory';

export default function useLocalStorage(
  key: string,
): [IWarehouse, Dispatch<SetStateAction<IWarehouse>>] {
  const [data, setData] = useState<IWarehouse>({ id: 0, name: 'Warehouse' });

  useEffect(() => {
    if (key === 'selectedWarehouse') {
      const localStorageWarehouseKey = localStorage.getItem(key);
      if (typeof localStorageWarehouseKey === 'string') {
        const localStorageWarehouse: IWarehouse = JSON.parse(
          localStorageWarehouseKey,
        );
        setData(localStorageWarehouse);
      }
    }
  }, [key]);
  return [data, setData];
}
