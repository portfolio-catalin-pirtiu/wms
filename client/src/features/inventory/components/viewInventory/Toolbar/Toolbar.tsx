import Stack from 'react-bootstrap/Stack';
import { WarehouseGroup } from '@features/inventory';

export default function Toolbar() {
  return (
    <Stack direction="horizontal" gap={1}>
      <WarehouseGroup />
    </Stack>
  );
}
