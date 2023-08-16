import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../context/AuthenticationProvider';
import { LoggedInUser } from '../../types/types';
import Message from '../common/Message/Message';

export default function Logout() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(' ');
  const { setUser } = useContext(AuthenticationContext);

  useEffect(() => {
    async function logoutUser() {
      try {
        const logoutStatus = await fetch(
          'http://localhost:4000/authentication/logout',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          },
        );

        if (logoutStatus.ok) {
          const noUser: LoggedInUser = await logoutStatus.json();
          setUser(noUser);
        } else {
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
          throw new Error('Logout Unsuccessful');
        }
      } catch (exception) {
        if (exception instanceof Error) {
          setErrorMessage(exception.message);
        }
      }
    }
    logoutUser();
  }, [navigate, setUser]);

  return (
    <>
      <Message error={errorMessage} />
    </>
  );
}
