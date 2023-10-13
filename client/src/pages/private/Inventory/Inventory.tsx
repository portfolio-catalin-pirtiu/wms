import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Toolbar from '../../../features/inventory/components/viewInventory/Toolbar/Toolbar';
import Message from '../../../components/Message/Message';
import { CommunicationContext } from '../../../context/CommunicationsProvider';

export default function Inventory() {
  const { successMessage, errorMessage } = useContext(CommunicationContext);
  return (
    <Container fluid>
      <Message success={successMessage} error={errorMessage} />
      <h1>Inventory</h1>
      <Toolbar />
    </Container>
  );
}
