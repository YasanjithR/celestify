import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Epic from '../components/EpicImage';

describe('Epic component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ image: 'test_image' }]),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    render(<Epic />);
  });

  it('fetches images on mount', async () => {
    render(<Epic />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

  it('fetches images on date change', async () => {
    const { getByLabelText } = render(<Epic />);
    const dateInput = getByLabelText('Date');

    fireEvent.change(dateInput, { target: { value: '2022-12-12' } });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

  it('displays images after fetch', async () => {
    const { findAllByAltText } = render(<Epic />);
    const images = await findAllByAltText(/^Image \d+$/);

    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute('src', expect.stringContaining('test_image'));
  });
});