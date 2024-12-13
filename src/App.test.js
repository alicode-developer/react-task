import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders form inputs correctly', () => {
  render(<App />);
  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Number of Guests/i)).toBeInTheDocument();
});

test('displays error messages on empty submission', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Book Now/i));
  expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
  expect(screen.getByText(/Time is required/i)).toBeInTheDocument();
});

test('shows success message on valid submission', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-06-01' } });
  fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '18:00' } });
  fireEvent.change(screen.getByLabelText(/Number of Guests/i), { target: { value: '2' } });
  fireEvent.click(screen.getByText(/Book Now/i));
  expect(screen.getByText(/Your table has been booked successfully/i)).toBeInTheDocument();
});
