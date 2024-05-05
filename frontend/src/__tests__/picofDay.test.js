import React from 'react'; 
import { render, waitFor, screen, act } from '@testing-library/react';
import PicOfTheDay from '../components/PicOfTheDay';
import usePictureOftheDay from '../hooks/fetchPOD';

jest.mock('../hooks/fetchPOD');

describe('PicOfTheDay', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render placeholder state initially', () => {
    usePictureOftheDay.mockReturnValue(null);

    render(<PicOfTheDay />);

    expect(screen.getByText(/Astronomy Picture of the Day/i)).toBeInTheDocument();
    expect(screen.getByText(/Title Placeholder/i)).toBeInTheDocument();
    expect(screen.getByText(/Explanation Placeholder/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Placeholder/i)).toBeInTheDocument();
  }); 

  it('should render data when available', async () => {
    const mockData = {
      url: 'https://test.com/image.jpg',
      title: 'Test Title',
      explanation: 'Test Explanation',
      hdurl: 'https://test.com/hdimage.jpg',
      apod_site: 'https://test.com/apod',
    };

    usePictureOftheDay.mockReturnValue(mockData);

    render(<PicOfTheDay />);

    await waitFor(() => expect(screen.getByText(/Test Title/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Test Explanation/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByAltText(/Placeholder/i)).toHaveAttribute('src', 'https://test.com/image.jpg'));
    await waitFor(() => expect(screen.getByText(/View/i)).toHaveAttribute('href', 'https://test.com/hdimage.jpg'));
    await waitFor(() => expect(screen.getByText(/Visit/i)).toHaveAttribute('href', 'https://test.com/apod')); 
  }); 
});  