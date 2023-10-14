import { useContext } from 'react';
import { CommunicationContext } from '../../../context/CommunicationsProvider';
import Message from '../../../components/Message/Message';

export default function Dashboard() {
  const { successMessage, errorMessage } = useContext(CommunicationContext);
  return (
    <>
      <h1>Dashboard</h1>
      <Message success={successMessage} error={errorMessage} />
    </>
  );
}
