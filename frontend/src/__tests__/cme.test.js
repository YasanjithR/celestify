import React from 'react';
import { render, screen } from '@testing-library/react';
import CMEComponent from '../components/CMEComponent';
import useFetchDataFromDonki from '../hooks/fetchDONKI';

jest.mock('../hooks/fetchDONKI'); 

describe('CMEComponent', () => {
  beforeEach(() => {
    useFetchDataFromDonki.mockImplementation(() => ({
      data: [{ startTime: '2022-01-01', submissionTime: '2022-01-01', catalog: 'Test Catalog', note: 'Test Note', link: 'https://test.com' }],
      loading: false,
      error: null,
    }));
  });

  test('renders CMEComponent component without crashing', () => {
    render(<CMEComponent title="Test Title" startDate="2022-01-01" endDate="2022-01-01" type="CME" />);
  });

  test('shows data when fetch completes', async () => {
    render(<CMEComponent title="Test Title" startDate="2022-01-01" endDate="2022-01-01" type="CME" />);
    expect(await screen.findByText('Start Time: 2022-01-01')).toBeInTheDocument();
    expect(screen.getByText('Submission Time: 2022-01-01')).toBeInTheDocument();
    expect(screen.getByText('Catalog: Test Catalog')).toBeInTheDocument();
    expect(screen.getByText('Note: Test Note')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /https:\/\/test.com/i })).toBeInTheDocument();
  });   

  test('shows loading state', () => {
    useFetchDataFromDonki.mockImplementation(() => ({
      data: null,
      loading: true,
      error: null,
    }));
    render(<CMEComponent title="Test Title" startDate="2022-01-01" endDate="2022-01-01" type="CME" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('shows error state', () => {
    useFetchDataFromDonki.mockImplementation(() => ({
      data: null,
      loading: false,
      error: { message: 'Test error' },
    }));
    render(<CMEComponent title="Test Title" startDate="2022-01-01" endDate="2022-01-01" type="CME" />);
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });
});