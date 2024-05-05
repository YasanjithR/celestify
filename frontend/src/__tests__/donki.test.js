import { render, fireEvent, screen } from '@testing-library/react';
import DONKIForm from '../components/DONKI';

describe('DONKIForm', () => {
  test('renders without crashing', () => {
    render(<DONKIForm />);
    const donkiElement = screen.getByText('DONKI');
    expect(donkiElement).toBeInTheDocument();
  });

  test('changes state correctly when start date, end date, and type are changed', () => {
    render(<DONKIForm />);
    const startDateInput = screen.getByLabelText('Start Date');
    const endDateInput = screen.getByLabelText('End Date');
    const typeInput = screen.getByLabelText('Type');

    fireEvent.change(startDateInput, { target: { value: '2022-06-01' } });
    fireEvent.change(endDateInput, { target: { value: '2022-06-02' } });
    fireEvent.change(typeInput, { target: { value: 'IPS ' } });

    expect(startDateInput.value).toBe('2022-06-01');
    expect(endDateInput.value).toBe('2022-06-02');
    expect(typeInput.value).toBe('IPS ');
  });

  test('renders correct component based on selected type', () => {
    render(<DONKIForm />);
    const typeInput = screen.getByLabelText('Type');

    fireEvent.change(typeInput, { target: { value: 'CME' } });
    let cmeComponent = screen.getByText('Title for Option 1');
    expect(cmeComponent).toBeInTheDocument();

    fireEvent.change(typeInput, { target: { value: 'IPS ' } });
    let ipsComponent = screen.getByText('Title for Option 2');
    expect(ipsComponent).toBeInTheDocument();

    fireEvent.change(typeInput, { target: { value: 'FLR' } });
    let solarFlareComponent = screen.getByText('Title for Option 3');
    expect(solarFlareComponent).toBeInTheDocument();
  });
});