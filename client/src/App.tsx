import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavLoggedIn from './components/NavBar/NavLoggedIn';
import NavPublic from './components/NavBar/NavPublic';
import AppRoutes from './routes/AppRoutes';
import Message from './components/common/Message/Message';
import { AuthenticationContext } from './context/AuthenticationProvider';
import { LoggedInUser } from './types/types';

function App() {
  const { user, setUser } = useContext(AuthenticationContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedInUserFetchCount, setLoggedInUserFetchCount] = useState(0);
  const navigate = useNavigate();
  // console.log('app component -> userContext', user);

  const fetchUserLoginDetails = useCallback(async () => {
    try {
      const response = await fetch(
        'http://localhost:4000/authentication/status',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (response.ok) {
        console.log('app component -> true');
        const loggedInUser: LoggedInUser = await response.json();
        setUser(loggedInUser);
      } else {
        console.log('app component -> false');
        const noUser: LoggedInUser = await response.json();
        setUser(noUser);
        localStorage.removeItem('loggedInUser');
        navigate('/authentication/login');
      }
    } catch (exception) {
      if (exception instanceof Error) {
        setErrorMessage(exception.message);
      } else if (typeof exception === 'string') {
        setErrorMessage(exception);
      }
    }
  }, [setUser, navigate]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setLoggedInUserFetchCount(loggedInUserFetchCount + 1);
    }, 10000);

    return () => clearTimeout(timeOutId);
  }, [loggedInUserFetchCount]);

  useEffect(() => {
    fetchUserLoginDetails();
  }, [loggedInUserFetchCount, fetchUserLoginDetails]);

  return user.isLoggedIn ? (
    <>
      <NavLoggedIn />
      <Message error={errorMessage} />
      <AppRoutes />
    </>
  ) : (
    <>
      <NavPublic />
      <AppRoutes />
    </>
  );
}

export default App;
