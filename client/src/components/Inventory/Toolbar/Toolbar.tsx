import Stack from 'react-bootstrap/Stack';
import WarehouseGroupFeed from './WarehouseGroupFeed/WarehouseGroupFeed';

export default function Toolbar() {
  return (
    <Stack direction="horizontal" gap={1}>
      <WarehouseGroupFeed />
    </Stack>
  );
}
