import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { FaThumbsDown } from 'react-icons/fa';
import {BsShieldLockFill} from 'react-icons/bs'

interface CommunicationMessage {
  success?: string;
  error?: string;
  warning?: string;
}

export default function Message({ success, error, warning }: CommunicationMessage) {
  const [isError, setIsError] = useState(error ? true : false);
  const [isSuccess, setIsSuccess] = useState(success ? true : false);
  const [isWarning, setIsWarning] = useState(warning ? true : false);

  useEffect(() => {
    if (error) {
      const timeOutId = setTimeout(() => {
        setIsError(false);
      }, 2000);
      return () => clearTimeout(timeOutId);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timeOutId = setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
      return () => clearTimeout(timeOutId);
    }
  }, [success]);

  useEffect(() => {
    if (warning) {
      const timeOutId = setTimeout(() => {
        setIsWarning(false);
      }, 2000);
      return () => clearTimeout(timeOutId);
    }
  }, [warning]);

  const successTemplate = (
    <div className="success-container">
      <FaThumbsUp /> {success}
    </div>
  );

  const errorTemplate = (
    <div className="error-container">
      <FaThumbsDown /> {error}
    </div>
  );

  const warningTemplate = (
    <div className="warning-container">
      <BsShieldLockFill /> {warning}
    </div>
  );

  return (
    <h6>
      {isSuccess && successTemplate}
      {isError && errorTemplate}
      {isWarning && warningTemplate}
    </h6>
  );
}
