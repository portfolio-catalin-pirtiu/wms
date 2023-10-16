import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Authentication from '../Authentication';

function MockAuthentication() {
  return (
    <BrowserRouter>
      <Authentication />
    </BrowserRouter>
  );
}

describe('Authentication Component', () => {
  it('renders Authentication Component', () => {
    render(<MockAuthentication />);
    const header = screen.getByText(/login or sign up/i);
    expect(header).toBeInTheDocument();
  });
});
