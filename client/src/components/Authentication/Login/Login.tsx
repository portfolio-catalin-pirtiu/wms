import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { object, string } from 'yup';
import { Formik, FormikValues } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Message from '../../common/Message/Message';
import { LoggedInUser } from '../../../types/types';
import { useContext } from 'react';
import { AuthenticationContext } from '../../../context/AuthenticationProvider';

const loginSchema = object().shape({
  email: string().email('Invalid email address').required('Required'),
  password: string().required('Required'),
});

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useContext(AuthenticationContext);

  async function submitForm(values: FormikValues) {
    // fetch request must have credentials: 'include' so that the cookies can be set
    // also check note on the server side: index.ts -> cors middleware
    try {
      const response = await fetch(
        'http://localhost:4000/authentication/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(values),
        },
      );

      if (response.ok) {
        const loggedInUser: LoggedInUser = await response.json();
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        navigate('/dashboard');
      } else {
        throw new Error('Invalid Credentials');
      }
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      } else if (typeof e === 'string') {
        setErrorMessage(e);
      }
    }
  }

  let formContent = (
    <Formik
      validationSchema={loginSchema}
      onSubmit={submitForm}
      initialValues={{ email: '', password: '' }}
    >
      {({ handleSubmit, handleChange, touched, values, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email Address"
              autoComplete="email"
              aria-label="Required"
              aria-describedby="email"
              value={values.email}
              onChange={handleChange}
              isValid={touched.email && !errors.email}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type={errors.email ? 'invalid' : 'valid'}>
              {errors.email ? errors.email : 'Looks Good!'}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="password"
              aria-label="Required"
              aria-describedby="password"
              value={values.password}
              onChange={handleChange}
              isValid={touched.password && !errors.password}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type={errors.password ? 'invalid' : 'valid'}>
              {errors.password ? errors.password : 'Looks Good!'}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
  return !!errorMessage ? (
    <>
      <Message error={errorMessage} />
      {formContent}
    </>
  ) : (
    <>{formContent}</>
  );
}
