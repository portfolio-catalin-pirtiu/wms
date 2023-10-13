import Stack from 'react-bootstrap/Stack';
import { WarehouseGroupFeed } from '@features/inventory';

export default function Toolbar() {
  return (
    <Stack direction="horizontal" gap={1}>
      <WarehouseGroupFeed />
    </Stack>
  );
}
