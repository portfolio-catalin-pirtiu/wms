import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupLogin } from './helpers/login';

beforeEach(() => {
  setupLogin();
});

test('render heading', () => {
  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent(/login/i);
});

test('render email label text', () => {
  const emailLabel = screen.getByLabelText(/mail address/i);
  expect(emailLabel).toBeInTheDocument();
});

test('render email input field', () => {
  const emailInput = screen.getByRole('textbox');
  expect(emailInput).toHaveAttribute('type', 'email');
});

test('tests email input value change', async () => {
  const emailInput = screen.getByLabelText(/email/i);
  await userEvent.type(emailInput, 'vale');
  expect(emailInput).toHaveValue('vale');
});

test('render password label text', () => {
  const passwordLabel = screen.getByLabelText(/password/i);
  expect(passwordLabel).toBeInTheDocument();
});

test('tests password input value change', async () => {
  const passwordInput = screen.getByLabelText(/password/i);
  await userEvent.type(passwordInput, 'sun');
  expect(passwordInput).toHaveValue('sun');
});

test('renders Login button', () => {
  const loginButton = screen.getByRole('button', { name: 'Login' });
  expect(loginButton).toBeInTheDocument();
});
