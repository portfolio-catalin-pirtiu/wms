import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../../context/AuthenticationProvider';
import { CommunicationContext } from '../../../../context/CommunicationsProvider';
import { ILoggedInUser } from '@features/userAccount';
import Message from '../../../../components/Message/Message';
import { serverBaseUrl } from '../../../../data/constants';

export default function Logout() {
  const navigate = useNavigate();
  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
    useContext(CommunicationContext);
  const { setUser } = useContext(AuthenticationContext);

  useEffect(() => {
    const logoutUserFromApi = new URL('authentication/logout', serverBaseUrl);
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
          const noUser: ILoggedInUser = await logoutStatus.json();
          setSuccessMessage('Logout Successful');
          setTimeout(() => {
            setUser(noUser);
          }, 2000);
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
  }, [navigate, setUser, setErrorMessage, setSuccessMessage]);

  return (
    <>
      <Message success={successMessage} error={errorMessage} />
    </>
  );
}
