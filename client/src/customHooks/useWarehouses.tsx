import { useEffect, useState, useContext } from 'react';
import { CommunicationContext } from '../context/CommunicationsProvider';
import { Warehouse, WarehouseProps } from '../types/types';

interface UseWarehouse {
  baseUrl: string;
  method: 'GET';
}

export default function useWarehouses({
  baseUrl,
  method,
}: UseWarehouse): WarehouseProps {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const { setErrorMessage } = useContext(CommunicationContext);

  function handleChange(warehouses: Warehouse[]) {
    setWarehouses(warehouses);
  }

  useEffect(() => {
    const url = new URL('inventory/warehouse', baseUrl);
    (async () => {
      try {
        const warehouseDatabaseRequest = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (warehouseDatabaseRequest.ok) {
          const allWarehouses: Warehouse[] =
            await warehouseDatabaseRequest.json();
          handleChange(allWarehouses);
        } else {
          const error: string = await warehouseDatabaseRequest.json();
          throw new Error(error);
        }
      } catch (e) {
        if (e instanceof Error) setErrorMessage(e.message);
      }
    })();
  }, [baseUrl, method, setErrorMessage]);

  const warehouseProps = {
    warehouses: warehouses,
    setWarehouses: handleChange,
  };
  return warehouseProps;
}
