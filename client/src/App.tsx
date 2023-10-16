import { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavPrivate from './components/NavBar/NavPrivate';
import NavPublic from './components/NavBar/NavPublic';
import NavRoutes from './components/NavBar/NavRoutes';
import Message from './components/Message/Message';
import { AuthenticationContext } from './context/AuthenticationProvider';
import { ILoggedInUser } from '@features/userAccount';
import { serverBaseUrl } from './data/constants';

interface Warning {
  message: string;
}

class Warning {
  constructor(message: string) {
    this.message = message;
  }
}
function App() {
  const { user, setUser } = useContext(AuthenticationContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [loggedInUserFetchCount, setLoggedInUserFetchCount] = useState(0);
  const navigate = useNavigate();

  const fetchUserLoginDetails = useCallback(async () => {
    const checkAuthenticationStatus = new URL(
      'authentication/status',
      serverBaseUrl,
    );
    try {
      const response = await fetch(checkAuthenticationStatus, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const loggedInUser: ILoggedInUser = await response.json();
        setUser(loggedInUser);
      } else if (user.isLoggedIn) {
        const noUser: ILoggedInUser = await response.json();
        setUser(noUser);
        localStorage.removeItem('loggedInUser');
        navigate('/authentication/login');
        throw new Warning('Session Expired - you have been logged out');
      }
    } catch (exception) {
      if (exception instanceof Error) {
        setErrorMessage(exception.message);
      } else if (exception instanceof Warning) {
        setWarningMessage('Logged Out');
      } else if (typeof exception === 'string') {
        setErrorMessage(exception);
      }
    } finally {
      setErrorMessage('');
      setWarningMessage('');
    }
  }, [user.isLoggedIn, setUser, navigate]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setLoggedInUserFetchCount(loggedInUserFetchCount + 1);
    }, 15000);

    return () => clearTimeout(timeOutId);
  }, [loggedInUserFetchCount]);

  useEffect(() => {
    fetchUserLoginDetails();
  }, [loggedInUserFetchCount, fetchUserLoginDetails]);

  return user.isLoggedIn ? (
    <>
      <NavPrivate />
      <NavRoutes />
      <Message error={errorMessage} warning={warningMessage} />
    </>
  ) : (
    <>
      <NavPublic />
      <NavRoutes />
      <Message error={errorMessage} warning={warningMessage} />
    </>
  );
}

export default App;
