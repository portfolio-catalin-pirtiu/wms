import { useEffect, useState, useContext } from 'react';
import { CommunicationContext } from '../context/CommunicationsProvider';
import { Warehouse, WarehouseProps } from '@features/inventory';

interface UseWarehouse {
  baseUrl: string;
}

export default function useWarehouses({
  baseUrl,
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
          method: 'GET',
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
  }, [baseUrl, setErrorMessage]);

  const warehouseProps = {
    warehouses: warehouses,
    setWarehouses: handleChange,
  };
  return warehouseProps;
}
