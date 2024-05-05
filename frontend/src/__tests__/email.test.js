import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Hero from '../components/Email';
import useEmail from '../hooks/fetchEmail';

jest.mock('../hooks/fetchEmail');

describe('Hero component', () => {
  beforeEach(() => {
    useEmail.mockReturnValue({
      set: jest.fn(),
      submit: jest.fn(),
      get: null,
      submitted: false
    });
  });

  it('renders without crashing', () => {
    render(<Hero />);
  });

  it('calls set and submit functions when form is submitted', async () => {
    const { getByPlaceholderText, getByText } = render(<Hero />);
    const emailInput = getByPlaceholderText('Your email address');
    const submitButton = getByText('Start now');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(useEmail().set).toHaveBeenCalledWith('test@example.com');
      expect(useEmail().submit).toHaveBeenCalled();
    });
  });

  it('displays success message when email is submitted', async () => {
    useEmail.mockReturnValue({
      set: jest.fn(),
      submit: jest.fn(),
      get: 'test@example.com',
      submitted: true
    });

    const { getByText } = render(<Hero />);
    const successMessage = getByText("You're already registered to the service an the email");

    await waitFor(() => {
      expect(successMessage).toBeInTheDocument();
    });
  });
});