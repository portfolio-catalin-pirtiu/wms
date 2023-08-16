import WarehouseGroup from './WarehouseGroup/WarehouseGroup';
import useWarehouses from '../../../../customHooks/useWarehouses';

export default function WarehouseGroupFeed() {
  const baseUrl = 'http://localhost:4000';
  const method = 'GET';
  const warehouses = useWarehouses({ baseUrl, method });

  return (
    <>
      <WarehouseGroup warehouses={warehouses} />
    </>
  );
}
