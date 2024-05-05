import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoverDetails from '../components/Rover';

describe('RoverDetails', () => {
  test('renders RoverDetails component without crashing', () => {
    render(<RoverDetails />);
  });

  test('renders "Mars Rovers" title', () => {
    render(<RoverDetails />);
    expect(screen.getByText('Mars Rovers')).toBeInTheDocument();
  });

  test('renders "View" button', () => {
    render(<RoverDetails />);
    expect(screen.getByText('View')).toBeInTheDocument();
  });

  test('shows error when date is not selected and "View" button is clicked', async () => {
    render(<RoverDetails />);
    userEvent.click(screen.getByText('View'));
    expect(await screen.findByText('Please select a date')).toBeInTheDocument();
  });

  test('shows error when rover is not selected and "View" button is clicked', async () => {
    render(<RoverDetails />);
    userEvent.click(screen.getByText('View'));
    expect(await screen.findByText('Please select a rover')).toBeInTheDocument();
  });
});