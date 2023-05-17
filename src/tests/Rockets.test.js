import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Rockets from '../components/Rockets';
import '@testing-library/jest-dom/extend-expect'
import { fetchRockets } from '../redux/rockets/rocketsSlice';
import { activechoose } from '../redux/missions/missionsSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../redux/rockets/rocketsSlice', () => ({
  fetchRockets: jest.fn(),
}));
jest.mock('../redux/missions/missionsSlice', () => ({
  activechoose: jest.fn(),
}));

describe('Rockets', () => {
  test('renders rockets and handles loading state', async () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      rockets: [
        { id: 1, name: 'Rocket 1' },
        { id: 2, name: 'Rocket 2' },
      ],
      loading: false,
    });

    const { getByText } = render(<Rockets />);

    await waitFor(() => {
      expect(getByText('Rocket 1')).toBeInTheDocument();
      expect(getByText('Rocket 2')).toBeInTheDocument();
      expect(fetchRockets).not.toHaveBeenCalled();
      expect(activechoose).not.toHaveBeenCalled();
    });
  });

  test('fetches rockets and handles loading state', async () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      rockets: [],
      loading: true,
    });

    const { getByText } = render(<Rockets />);

    await waitFor(() => {
      expect(getByText('Loading...')).toBeInTheDocument();
      expect(fetchRockets).toHaveBeenCalled();
      expect(activechoose).toHaveBeenCalledWith(1);
    });
  });
});
