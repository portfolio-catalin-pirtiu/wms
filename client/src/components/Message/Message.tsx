import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface CommunicationMessage {
  success?: string;
  error?: string;
  warning?: string;
}

export default function Message({
  success,
  error,
  warning,
}: CommunicationMessage) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (error) {
      setIsError(true);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setIsSuccess(true);
      const timeOutId = setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
      return () => clearTimeout(timeOutId);
    }
  }, [success]);

  useEffect(() => {
    if (warning) {
      setIsWarning(true);
      const timeOutId = setTimeout(() => {
        setIsWarning(false);
      }, 2000);
      return () => clearTimeout(timeOutId);
    }
  }, [warning]);

  const errorTemplate = (
    <Alert show={isError} variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{error}</p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="outline-danger" onClick={() => setIsError(false)}>
          Close
        </Button>
      </div>
    </Alert>
  );

  const successTemplate = (
    <Alert show={isSuccess} variant="success">
      <Alert.Heading>Success</Alert.Heading>
      <p>{success}</p>
    </Alert>
  );

  const warningTemplate = (
    <Alert show={isWarning} variant="warning">
      <Alert.Heading>Warning</Alert.Heading>
      <p>{warning}</p>
    </Alert>
  );

  return (
    <h6 role="alert">
      {successTemplate}
      {warningTemplate}
      {errorTemplate}
    </h6>
  );
}
