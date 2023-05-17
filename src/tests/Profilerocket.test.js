import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import Profilerocket from '../components/Profilerocket';
import { bookedRockets } from '../redux/rockets/rocketsSlice';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('../redux/rockets/rocketsSlice', () => ({
  bookedRockets: jest.fn(),
}));

describe('Profilerocket', () => {
  test('renders reserved rockets', async () => {
    useSelector.mockReturnValue({
      reservedRockets: [
        { id: 1, name: 'Rocket 1' },
        { id: 2, name: 'Rocket 2' },
      ],
    });
    useDispatch.mockReturnValue(jest.fn());

    const { getByText } = render(<Profilerocket />);

    await waitFor(() => {
      expect(getByText('Rocket 1')).toBeInTheDocument();
      expect(getByText('Rocket 2')).toBeInTheDocument();
      expect(bookedRockets).toHaveBeenCalled();
    });
  });
});
