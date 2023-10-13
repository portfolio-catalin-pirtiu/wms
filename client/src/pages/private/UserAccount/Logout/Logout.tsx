import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../../context/AuthenticationProvider';
import { LoggedInUser } from '@features/userAccount';
import Message from '../../../../components/Message/Message';
import { baseUrl } from '../../../../data/constants';

export default function Logout() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(' ');
  const { setUser } = useContext(AuthenticationContext);

  useEffect(() => {
    const logoutUserFromApi = new URL('authentication/logout', baseUrl);
    async function logoutUser() {
      try {
        const logoutStatus = await fetch(logoutUserFromApi, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

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
