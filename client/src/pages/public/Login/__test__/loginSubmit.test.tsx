import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from '../Login';
import Dashboard from '../../../private/Dashboard/Dashboard';
import nock from 'nock';
import { serverBaseUrl } from '../../../../data/constants';
import { useLocation } from 'react-router-dom';

function Location() {
  const location = useLocation();

  return <h1>{location.pathname}</h1>;
}

function setup() {
  const event = userEvent.setup();
  const { container } = render(
    <>
      <MemoryRouter initialEntries={['/authentication/login']}>
        <Routes>
          <Route path="/authentication/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Location />
      </MemoryRouter>
    </>,
  );
  const user = { username: 'ccc@c.com', password: '123' };

  const changeUsernameInput = async (value: string) => {
    const usernameInput = screen.getByLabelText(/email/i);
    await event.type(usernameInput, value);
  };

  const changePasswordInput = async (value: string) => {
    const passwordElement = screen.getByLabelText(/password/i);
    await event.type(passwordElement, value);
  };

  const clickLogin = async () => {
    const loginButton = screen.getByRole('button', { name: 'Login' });
    await event.click(loginButton);
  };

  return {
    container,
    user,
    changeUsernameInput,
    changePasswordInput,
    clickLogin,
  };
}

async function setupSuccessCase() {
  const utils = setup();
  await utils.changeUsernameInput(utils.user.username);
  await utils.changePasswordInput(utils.user.password);
  await utils.clickLogin();
  return utils;
}

const server = nock(serverBaseUrl);

test('form submission with success message', async () => {
  server.post('/authentication/login').reply(200, {
    isLoggedIn: true,
    id: 3,
    name: 'Moon_Pig',
    email: 'ccc@c.com',
  });

  const utils = setupSuccessCase();

  await waitFor(async () => {
    expect((await utils).container).toBeDefined();
  });
});
