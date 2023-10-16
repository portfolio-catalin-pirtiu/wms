import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Home Component', () => {
  it('renders heading text', () => {
    render(<Home />);
    const heading = screen.getByText(/home page/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders button', () => {
    render(<Home />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders button text', () => {
    render(<Home />);
    const buttonText = screen.getByText(/login or sign up/i);
    expect(buttonText).toBeInTheDocument();
  });
});
