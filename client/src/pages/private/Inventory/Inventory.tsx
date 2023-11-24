import Container from 'react-bootstrap/Container';
import Toolbar from '../../../features/inventory/components/viewInventory/Toolbar/Toolbar';

export default function Inventory() {
  return (
    <Container fluid>
      <h1>Inventory</h1>
      <Toolbar />
    </Container>
  );
}
