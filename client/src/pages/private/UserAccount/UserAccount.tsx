import { useEffect, useState, useContext } from 'react';
import { ResponseStatus } from '../../../types';
import { IDatabaseUser, ILoggedInUser } from '@features/userAccount';
import Message from '../../../components/Message/Message';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import { Formik, FormikValues } from 'formik';
import { object, string } from 'yup';
import { FormControl } from 'react-bootstrap';
import { AuthenticationContext } from '../../../context/AuthenticationProvider';
import { PasswordModal } from '@features/userAccount';
import { DeleteAccountModal } from '@features/userAccount';
import { serverBaseUrl } from '../../../data/constants';
import { CommunicationContext } from '../../../context/CommunicationsProvider';

const userAccountSchema = object().shape({
  address1: string(),
  address2: string(),
  city: string(),
  county: string(),
  country: string(),
  postcode: string(),
});

export default function UserAccount() {
  const [userAccount, setUserAccount] = useState<IDatabaseUser>({
    id: 0,
    name: '',
    email: '',
    password: '',
    address1: '',
    address2: '',
    city: '',
    county: '',
    country: '',
    postcode: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const { setUser } = useContext(AuthenticationContext);
  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
    useContext(CommunicationContext);

  useEffect(() => {
    const userAccountFromApi = new URL('user/account', serverBaseUrl);
    (async function getUserDetails() {
      try {
        const loggedInUserRequest = await fetch(userAccountFromApi, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const loggedInUser: IDatabaseUser = await loggedInUserRequest.json();
        setUserAccount(loggedInUser);
      } catch (e) {
        if (e instanceof Error) {
          setErrorMessage(e.message);
        }
      }
    })();
  }, [setErrorMessage]);

  const handleEditingOn = () => setIsEditing(true);
  const handleEditingOff = () => setIsEditing(false);

  async function handleEditFormSubmit(values: FormikValues) {
    const updateUserAccountFromApi = new URL(
      'user/updateAccount',
      serverBaseUrl,
    );
    handleEditingOff();
    setUserAccount({
      ...values,
      name: values.name,
      email: values.email,
      password: values.password,
    });

    try {
      const updateAccountRequest = await fetch(updateUserAccountFromApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });

      if (updateAccountRequest.ok) {
        setSuccessMessage('Account Updated Successfully');
      } else {
        const error: Error = await updateAccountRequest.json();
        throw new Error(error.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  }

  async function handlePasswordChange(values: FormikValues) {
    const updateUserAccountPassword = new URL(
      'user/passwordChange',
      serverBaseUrl,
    );
    try {
      const passwordChangeRequest = await fetch(updateUserAccountPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });

      if (passwordChangeRequest.ok) {
        setSuccessMessage('Password Changed Successfully');
      } else {
        const error: ResponseStatus = await passwordChangeRequest.json();
        setErrorMessage(error.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  }

  async function handleDeleteAccount() {
    const deleteUserAccountFromApi = new URL('user/delete', serverBaseUrl);
    try {
      const deleteAccountRequest = await fetch(deleteUserAccountFromApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (deleteAccountRequest.ok) {
        const noUser: ILoggedInUser = await deleteAccountRequest.json();
        setUser(noUser);
        clearLocalStorage();
      } else {
        const error: ResponseStatus = await deleteAccountRequest.json();
        throw new Error(error.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  }

  function clearLocalStorage() {
    localStorage.clear();
  }

  const commonContent = (
    <>
      <h1>User Account</h1>
      <Message error={errorMessage} success={successMessage} />
    </>
  );

  const notEditContent = (
    <Container>
      <Table hover>
        <tbody>
          <tr>
            <td className="fw-bold">Name</td>
            <td>{userAccount.name}</td>
          </tr>

          <tr>
            <td>Email</td>
            <td>{userAccount.email}</td>
          </tr>

          <tr>
            <td>Address 1</td>
            <td>{userAccount.address1}</td>
          </tr>

          <tr>
            <td>Address 2</td>
            <td>{userAccount.address2}</td>
          </tr>

          <tr>
            <td>City</td>
            <td>{userAccount.city}</td>
          </tr>

          <tr>
            <td>County</td>
            <td>{userAccount.county}</td>
          </tr>

          <tr>
            <td>Country</td>
            <td>{userAccount.country}</td>
          </tr>

          <tr>
            <td>Postcode</td>
            <td>{userAccount.postcode}</td>
          </tr>
        </tbody>
      </Table>
      <Stack direction="horizontal" gap={2} className="col-md-5 mx-auto">
        <Button
          type="button"
          onClick={handleEditingOn}
          variant="outline-primary"
        >
          Edit
        </Button>

        <PasswordModal handlePasswordChange={handlePasswordChange} />
        <DeleteAccountModal handleDeleteAccount={handleDeleteAccount} />
      </Stack>
    </Container>
  );

  const editContent = (
    <Formik
      validationSchema={userAccountSchema}
      initialValues={userAccount}
      onSubmit={handleEditFormSubmit}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Container>
          <Form noValidate onSubmit={handleSubmit}>
            <Table hover>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{values.name}</td>
                </tr>

                <tr>
                  <td>Email</td>
                  <td>{values.email}</td>
                </tr>

                <tr>
                  <td>Address 1</td>
                  <td>
                    {
                      <Form.Control
                        type="address"
                        name="address1"
                        autoComplete="on"
                        value={values.address1}
                        onChange={handleChange}
                      ></Form.Control>
                    }
                  </td>
                </tr>
                <tr>
                  <td>Address 2</td>
                  <td>
                    {
                      <FormControl
                        type="text"
                        name="address2"
                        autoComplete="on"
                        value={values.address2}
                        onChange={handleChange}
                      ></FormControl>
                    }
                  </td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>
                    {
                      <FormControl
                        type="text"
                        name="city"
                        autoComplete="on"
                        value={values.city}
                        onChange={handleChange}
                      ></FormControl>
                    }
                  </td>
                </tr>
                <tr>
                  <td>County</td>
                  <td>
                    {
                      <FormControl
                        type="text"
                        name="county"
                        autoComplete="on"
                        value={values.county}
                        onChange={handleChange}
                      ></FormControl>
                    }
                  </td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>
                    {
                      <FormControl
                        type="text"
                        name="country"
                        autoComplete="country-name"
                        value={values.country}
                        onChange={handleChange}
                      ></FormControl>
                    }
                  </td>
                </tr>
                <tr>
                  <td>Postcode</td>
                  <td>
                    {
                      <FormControl
                        type="text"
                        name="postcode"
                        autoComplete="postal-code"
                        value={values.postcode}
                        onChange={handleChange}
                      ></FormControl>
                    }
                  </td>
                </tr>
              </tbody>
            </Table>
            <Button type="submit">Save Changes</Button>
          </Form>
        </Container>
      )}
    </Formik>
  );

  return isEditing ? (
    <>
      {commonContent}
      {editContent}
    </>
  ) : (
    <>
      {commonContent}
      {notEditContent}
    </>
  );
}
