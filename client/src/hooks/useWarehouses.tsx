import { useEffect, useState, useContext } from 'react';
import { CommunicationContext } from '../context/CommunicationsProvider';
import { IWarehouse, IWarehouseGroupProps } from '@features/inventory';

interface UseWarehouse {
  serverBaseUrl: string;
}

export default function useWarehouses({
  serverBaseUrl,
}: UseWarehouse): IWarehouseGroupProps {
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);

  const { setErrorMessage } = useContext(CommunicationContext);

  function handleChange(warehouses: IWarehouse[]) {
    setWarehouses(warehouses);
  }

  useEffect(() => {
    const url = new URL('inventory/warehouse', serverBaseUrl);
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
          const allWarehouses: IWarehouse[] =
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
  }, [serverBaseUrl, setErrorMessage]);

  const warehouseProps = {
    warehouses: warehouses,
    onWarehouseChange: handleChange,
  };
  return warehouseProps;
}
