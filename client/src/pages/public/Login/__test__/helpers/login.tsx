import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../Login';

export function MockLogin() {
  return (
    <MemoryRouter initialEntries={['/home', ]}>
      <Login />
    </MemoryRouter>
  );
}

export function setupLogin() {
  render(<MockLogin />);
}
