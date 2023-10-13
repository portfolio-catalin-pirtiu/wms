import { WarehouseGroup } from '@features/inventory';
import useWarehouses from '../../../../../../hooks/useWarehouses';
import { baseUrl } from '../../../../../../data/constants';

export default function WarehouseGroupFeed() {
  const warehouses = useWarehouses({ baseUrl });

  return (
    <>
      <WarehouseGroup warehouses={warehouses} />
    </>
  );
}
