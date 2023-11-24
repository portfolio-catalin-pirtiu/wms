import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { object, string } from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useContext } from 'react';
import { IDatabaseUser } from '@features/userAccount';
import { serverBaseUrl } from '../../../../data/constants';
import { CommunicationContext } from '../../../../context/CommunicationsProvider';

class User implements IDatabaseUser {
  id?: number | undefined;
  name: string;
  email: string;
  password: string;
  address1?: string | undefined;
  address2?: string | undefined;
  city?: string | undefined;
  county?: string | undefined;
  country?: string | undefined;
  postcode?: string | undefined;
  constructor(props: IDatabaseUser) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.address1 = props.address1;
    this.address2 = props.address2;
    this.city = props.city;
    this.county = props.county;
    this.country = props.country;
    this.postcode = props.postcode;
  }
}

const userSchema = object().shape({
  name: string().required('Required'),
  email: string().email('Invalid email address').required('Required'),
  password: string().required('Required'),
  address1: string(),
  address2: string(),
  city: string(),
  county: string(),
  country: string(),
  postcode: string(),
});

export default function SignUpWithEmail() {
  const navigate = useNavigate();
  const { setSuccessMessage, setErrorMessage } =
    useContext(CommunicationContext);
  const initialFormValues = useRef({
    name: '',
    email: '',
    password: '',
    address1: '',
    address2: '',
    city: '',
    county: '',
    country: '',
    postcode: '',
  } as IDatabaseUser);
  const localStorageSignUpFormKey = 'signUpFormData';

  useEffect(() => {
    // get local storage data if it exists
    const localStorageSignUpFormData = getFromLocalStorage(
      localStorageSignUpFormKey,
    );

    if ('name' in localStorageSignUpFormData) {
      initialFormValues.current = Object.assign({}, localStorageSignUpFormData);
    }
  }, []);

  function getFromLocalStorage(key: string): IDatabaseUser {
    const localStorageData = localStorage.getItem(key);

    if (typeof localStorageData === 'string') {
      const data: IDatabaseUser = JSON.parse(localStorageData);
      return data;
    }
    return {
      name: '',
      email: '',
      password: '',
      address1: '',
      address2: '',
      city: '',
      county: '',
      country: '',
      postcode: '',
    } as IDatabaseUser;
  }

  async function handleAddNewUser(formValues: IDatabaseUser) {
    const newUser = new User(formValues);
    const newUserToApi = new URL('authentication/users', serverBaseUrl);
    try {
      const newUserRequest = await fetch(newUserToApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (newUserRequest.ok) {
        localStorage.removeItem(localStorageSignUpFormKey);
        setSuccessMessage(`Welcome to the Family, ${newUser.name}`);
        setTimeout(() => {
          navigate('/authentication');
        }, 4000);
      } else {
        const error: string = await newUserRequest.json();
        throw new Error(error);
      }
    } catch (e) {
      localStorage.setItem(localStorageSignUpFormKey, JSON.stringify(newUser));
      if (e instanceof Error) setErrorMessage(e.message);
    }
  }

  return (
    <Container>
      <Formik
        validationSchema={userSchema}
        onSubmit={handleAddNewUser}
        initialValues={initialFormValues.current}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Container className="my-5">
            <h1>Sign up With Email</h1>
            <Container className="my-5">
              <Form noValidate onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="organization-name">
                    Organization Name
                  </InputGroup.Text>
                  <Form.Control
                    name="name"
                    type="text"
                    autoComplete="on"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                    placeholder="Required"
                    aria-label="Required"
                    aria-describedby="organization-name"
                  />
                  <Form.Control.Feedback
                    type={errors.name ? 'invalid' : 'valid'}
                  >
                    {errors.name ? errors.name : 'Looks Good!'}
                  </Form.Control.Feedback>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text id="email">Email Address</InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Required"
                    aria-label="Required"
                    aria-describedby="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback
                    type={errors.email ? 'invalid' : 'valid'}
                  >
                    {errors.email ? errors.email : 'Looks Good!'}
                  </Form.Control.Feedback>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text id="password">Password</InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete="password"
                    placeholder="Required"
                    aria-label="Required"
                    aria-describedby="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback
                    type={errors.password ? 'invalid' : 'valid'}
                  >
                    {errors.password ? errors.password : 'Looks good!'}
                  </Form.Control.Feedback>
                </InputGroup>

                <Container className="my-5">
                  <Form.Text>Optional Fields</Form.Text>
                  <hr />
                  <Form.Group className="mb-3" controlId="basicFormAddress1">
                    <Form.Control
                      type="address"
                      name="address1"
                      autoComplete="on"
                      value={values.address1}
                      placeholder="Address 1"
                      onChange={handleChange}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="basicFormAddress2">
                    <Form.Control
                      type="text"
                      name="address2"
                      autoComplete="on"
                      value={values.address2}
                      placeholder="Address 2"
                      onChange={handleChange}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="basicFormCity">
                    <Form.Control
                      type="text"
                      name="city"
                      autoComplete="on"
                      placeholder="City"
                      value={values.city}
                      onChange={handleChange}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="basicFormCounty">
                    <Form.Control
                      type="text"
                      name="county"
                      autoComplete="on"
                      placeholder="County"
                      value={values.county}
                      onChange={handleChange}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="basicFormCountry">
                    <Form.Control
                      type="text"
                      name="country"
                      autoComplete="country-name"
                      placeholder="Country"
                      value={values.country}
                      onChange={handleChange}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="basicFormPostcode">
                    <Form.Control
                      type="text"
                      name="postcode"
                      autoComplete="postal-code"
                      placeholder="Postcode"
                      value={values.postcode}
                      onChange={handleChange}
                    ></Form.Control>
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Sign Up
                  </Button>
                </Container>
              </Form>
            </Container>
          </Container>
        )}
      </Formik>
    </Container>
  );
}
