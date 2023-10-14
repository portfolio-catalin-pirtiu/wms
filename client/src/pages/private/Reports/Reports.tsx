import { useContext } from 'react';
import { CommunicationContext } from '../../../context/CommunicationsProvider';
import Message from '../../../components/Message/Message';

export default function Reports() {
  const { successMessage, errorMessage } = useContext(CommunicationContext);
  return (
    <>
      <h1>View Reports</h1>
      <Message success={successMessage} error={errorMessage} />
    </>
  );
}
