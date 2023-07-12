import { useEffect, useState, useContext, useRef } from 'react';
import { AuthenticationContext } from '../../context/AuthenticationProvider';
import { DatabaseUser } from '../../types/types';
import Message from '../common/Message/Message';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Countainer from 'react-bootstrap/Container';
import { Formik, FormikValues } from 'formik';
import { object, string } from 'yup';

export default function UserAccount() {
  const { user } = useContext(AuthenticationContext);
  const userAccount = useRef<DatabaseUser>({
    name: '',
    email: '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMEssage] = useState(' ');
  useEffect(() => {
    (async function getUserDetails() {
      try {
        const loggedInUserRequest = await fetch(
          'http://localhost:4000/user/account',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        const loggedInUser: DatabaseUser = await loggedInUserRequest.json();
        Object.assign(userAccount.current, loggedInUser);
      } catch (e) {
        if (e instanceof Error) {
          setErrorMEssage(e.message);
        }
      }
    })();
  }, []);
  console.log('UserAccount Component -> edit user', userAccount);

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  function handleFormSubmit(values: FormikValues) {
    console.log('handle form submit -> values', values);
  }

  const userAccountSchema = object().shape({
    address1: string(),
    address2: string(),
    city: string(),
    county: string(),
    country: string(),
    postcode: string(),
  });

  const notEditContent = (
    <Form.Group>
      <Form.Label>Name</Form.Label>
      <Form.Control type='text' value={'here is the name'} className='text-muted' readOnly/>
    </Form.Group>
  );

  // const editContent = (
  //   <Formik
  //   validationSchema={userAccountSchema}
  //   initialValues={userAccount.current}
  //   onSubmit={handleFormSubmit}
  // >
  //   {({ handleSubmit, handleChange, values, touched, errors }) => (
      
  //   )}
  // </Formik>
  // );

  return (
    <>
      <h1>User Account</h1>
      <Message error={errorMessage} />
      {notEditContent}
    </>
  );
}
